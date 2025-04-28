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

    const toEmail = [`sales@jmillsent.com`]

    try {
      await sendSesEmail(
        toEmail,
        `JME Film Co <noreply@jmillsent.com>`,
        `Custom Reel request from ${req.body.email}`,
        `<p>Email: ${req.body.email}</p>`,
        `Email: ${req.body.email}`
      )
    } catch (error) {
      console.error('error', error)
    }

    res.status(201).json(contact)
  }
}
