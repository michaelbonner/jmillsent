import { v4 as uuidV4 } from 'uuid'
import dynamoDb from '../../lib/dynamo-db'
import sendSesEmail from '../../lib/send-ses-email'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const contact = {
      id: uuidV4(),
      createdAt: Date.now(),
      ...req.body,
    }

    await dynamoDb.put({
      Item: contact,
    })

    const toEmail = [`mike@bootpackdigital.com`, `jeremy@jmillsent.com`]

    try {
      await sendSesEmail(
        toEmail,
        `JME Film Co <noreply@jmillsent.com>`,
        `New Jmills contact submission from ${req.body.name}`,
        `<p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.emailAddress}</p>
        <p>Phone: ${req.body.phoneNumber}</p>
        <p>Message: ${req.body.message}</p>
        <p>Preference: ${req.body.preference.join(', ')}</p>`,
        `Name: ${req.body.name}\n
        Email: ${req.body.emailAddress}\n
        Phone: ${req.body.phoneNumber}\n
        Message: ${req.body.message}\n
        Preference: ${req.body.preference.join(', ')}`
      )
    } catch (error) {
      console.error('error', error)
    }

    res.status(201).json(contact)
  }
}
