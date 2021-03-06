const minio = require("minio")

const minioClient = new minio.Client({
  endPoint: "play.minio.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
});

module.exports = minioClient;