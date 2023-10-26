const { promisify } = require('util');
const express = require('express')
const redis = require('redis');
const {main }  = require('./rabbitmq/index.js')
const {router} = require('./routes')

main();

const app = express();

app.use(express.json());
app.use(router);

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);




module.exports = {app};