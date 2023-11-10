const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const CACHE_PREFIX = "location_cache:";
const EXPIRATION_TIME_SECONDS = 86400; // Um dia em segundos

async function addToCache(deviceId, location) {
  const key = `${CACHE_PREFIX}${deviceId}`;
  const value = JSON.stringify(location);
  await setAsync(key, value, "EX", EXPIRATION_TIME_SECONDS);
}

async function connect() {
  await client.connect();
}

async function getFromCache(deviceId) {
  const key = `${CACHE_PREFIX}${deviceId}`;
  const value = await getAsync(key);
  return value ? JSON.parse(value) : null;
}

connect();

module.exports = { addToCache, getFromCache };
