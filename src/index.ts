import { createClient } from 'redis';
import {mutationMethods} from "./cacheMethods"
import {queryMethods} from "./cacheMethods"

export type RedisClientType = ReturnType<typeof createClient>;

export const prismaRedisCacheHandler = (validation:number = 0, client:any) => {
  

  return async function redisCacheHandler(params:any, next:any) {
    let action = params.action;
    if (queryMethods?.includes(action)) {
      let cached = await client.get(JSON.stringify(params));
      if (cached) {
        console.log("data form redis");
        return cached;
      } else {
        const result:any = await next(params);
        client.set(JSON.stringify(params), JSON.stringify(result));
        validation > 0 && client.expire(JSON.stringify(params), validation);
        return result;
      }
    } else if (mutationMethods?.includes(action)) {
      const cacheKey:any = await client.keys(`*"model":"${params.model}"*`);
      if (cacheKey.length > 0) {
        await client.del(...cacheKey);
        const data = next(params);
        return data;
      } else {
        const data = next(params);
        return data;
      }
    }
  };
};
