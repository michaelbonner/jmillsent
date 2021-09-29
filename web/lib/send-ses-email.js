var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  accessKeyId: process.env.AWS_CONFIG_ACCESS_KEY,
  secretAccessKey: process.env.AWS_CONFIG_SECRET_KEY,
  region: process.env.AWS_CONFIG_REGION,
  domain: "ravens.works",
});

const sendSesEmail = async (to, from, subject, contentHtml, contentTxt) => {
  var params = {
    Destination: {
      /* required */
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: contentHtml,
        },
        Text: {
          Charset: "UTF-8",
          Data: contentTxt,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: from,
    ReplyToAddresses: [from],
  };

  // Create the promise and SES service object
  return await new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();
};

export default sendSesEmail;
