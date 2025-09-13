import { createClient } from "redis";

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET_HOST,
    port: parseInt(process.env.REDIS_SOCKET_PORT || "14371"),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export default client;
