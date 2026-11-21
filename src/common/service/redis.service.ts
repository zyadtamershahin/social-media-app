import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";

export class redis_service {
    private client: RedisClientType;

    constructor() {
        if (!env.redis_key) {
            throw new Error("Missing redis_key in environment configuration.");
        }

        this.client = createClient({
            url: env.redis_key,
        });
    }

    handle_connection() {
        this.client.on("error", (error: Error) => {
            console.log(error);
        });
    }

     connect() {
        if (!this.client.isOpen) {
             this.client.connect();
            console.log("redis connected");
        }

    }

    get (key:string){
        return this.client.get(key)
    }
    set (key:string,value:string,EX:number){
        return this.client.set(key,value,{EX:EX})
    }
    del (key:string){
        return this.client.del(key)
    }
    exists (key:string){
        return this.client.exists(key)
    }
    ttl (key:string){
        return this.client.ttl(key)
    }
    incr (key:string){
        return this.client.incr(key)
    }
    decr (key:string){
        return this.client.decr(key)
    }
}
//21

export const readis_service_instance = new redis_service()