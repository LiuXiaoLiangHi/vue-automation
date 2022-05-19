import JWTR from 'jwt-redis'

// 接入Redis,存储与获取历史消息(相比数据库)更快,损耗更少
import { createClient } from 'redis'
const client = createClient(6379, "localhost");
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();
var jwtr = new JWTR.default(client);//**working**
