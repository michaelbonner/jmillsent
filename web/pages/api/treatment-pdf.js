import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { jsPDF } from 'jspdf'

export const config = {
  maxDuration: 60,
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { slug } = req.query
  if (!slug) {
    return res.status(400).json({ error: 'Missing slug parameter' })
  }

  let browser
  try {
    const isDev = process.env.NODE_ENV === 'development'

    // Build the base URL from request headers
    const proto = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    const baseUrl = `${proto}://${host}`

    const launchOptions = isDev
      ? {
          executablePath:
            process.platform === 'darwin'
              ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
              : process.platform === 'win32'
                ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                : '/usr/bin/google-chrome',
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
      : {
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          args: chromium.args,
        }

    browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()

    await page.setViewport({
      width: 1692,
      height: 952,
      deviceScaleFactor: 2,
    })

    await page.goto(`${baseUrl}/treatment/${slug}?export=true`, {
      waitUntil: 'networkidle0',
      timeout: 45000,
    })

    // Wait for export-ready signal (assets loaded)
    await page.waitForSelector('[data-export-ready]', { timeout: 30000 })

    // Wait for fonts to finish loading
    await page.evaluate(() => document.fonts.ready)

    // Screenshot each slide
    const slideElements = await page.$$('[data-slide]')
    const screenshots = []

    for (const el of slideElements) {
      const png = await el.screenshot({ type: 'png' })
      screenshots.push(png)
    }

    if (screenshots.length === 0) {
      return res.status(500).json({ error: 'No slides found to export' })
    }

    // Build landscape PDF (dimensions in mm, 1692x952px at 2x → convert to mm at 72 DPI)
    const pxToMm = (px) => (px * 25.4) / 72
    const pageW = pxToMm(1692)
    const pageH = pxToMm(1692 * (952 / 1692))

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pageW, pageH],
    })

    for (let i = 0; i < screenshots.length; i++) {
      if (i > 0) pdf.addPage([pageW, pageH], 'landscape')
      const dataUrl = `data:image/png;base64,${screenshots[i].toString('base64')}`
      pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, pageH)
    }

    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${slug}-treatment.pdf"`
    )
    res.send(pdfBuffer)
  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({ error: 'Failed to generate PDF' })
  } finally {
    if (browser) await browser.close()
  }
}
