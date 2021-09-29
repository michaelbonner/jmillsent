import aws from "aws-sdk";

const client = new aws.DynamoDB.DocumentClient({
  accessKeyId: process.env.AWS_CONFIG_ACCESS_KEY,
  secretAccessKey: process.env.AWS_CONFIG_SECRET_KEY,
  region: process.env.AWS_CONFIG_REGION,
  params: {
    TableName: process.env.AWS_CONFIG_TABLE_NAME,
  },
});

const fileExports = {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};

export default fileExports;
