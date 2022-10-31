import { createClient } from 'redis';
export declare type RedisClientType = ReturnType<typeof createClient>;
export declare const prismaRedisCacheHandler: (validation: number | undefined, client: any, showConsole?: boolean) => (params: any, next: any) => Promise<any>;
