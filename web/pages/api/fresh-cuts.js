import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER,
})

export default async function handler(req, res) {
  const email = req.body.email

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    await mailchimp.lists.addListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID,
      {
        email_address: email,
        status: 'subscribed',
      }
    )
    return res.status(201).json({ error: '' })
  } catch (error) {
    let errorMessage
    if (error?.response?.body?.title) {
      errorMessage = error.response.body.title
    } else {
      errorMessage =
        error.message ||
        'Something went wrong. Please double-check your email and try again.'
    }

    return res.status(500).json({ error: errorMessage })
  }
}
