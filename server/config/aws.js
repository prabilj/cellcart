const AWS=require('aws-sdk');
require('dotenv').config()

AWS.config.update(
    {
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
        
    }
)
module.exports=AWS;