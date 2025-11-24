import { uploadFile } from 'react-s3';

const S3_BUCKET = 'tastingtable';
const REGION = 'us-east-1';
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

/* eslint-disable */
window.Buffer = window.Buffer || require('buffer').Buffer;

export const uploadImage = async (file) => {
  const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  };

  const result = await uploadFile(file, config)
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));

  return result;
};
