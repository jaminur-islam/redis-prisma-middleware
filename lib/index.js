"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaRedisCacheHandler = void 0;
const cacheMethods_1 = require("./cacheMethods");
const cacheMethods_2 = require("./cacheMethods");
const prismaRedisCacheHandler = (validation = 0, client, showConsole = false) => {
    return function redisCacheHandler(params, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let action = params.action;
            if (cacheMethods_1.queryMethods === null || cacheMethods_1.queryMethods === void 0 ? void 0 : cacheMethods_1.queryMethods.includes(action)) {
                let cached = yield client.get(JSON.stringify(params));
                if (cached) {
                    showConsole && console.log("<=== Data coming from redis ===>");
                    return cached;
                }
                else {
                    const result = yield next(params);
                    client.set(JSON.stringify(params), JSON.stringify(result));
                    validation > 0 && client.expire(JSON.stringify(params), validation);
                    return result;
                }
            }
            else if (cacheMethods_2.mutationMethods === null || cacheMethods_2.mutationMethods === void 0 ? void 0 : cacheMethods_2.mutationMethods.includes(action)) {
                const cacheKey = yield client.keys(`*"model":"${params.model}"*`);
                if (cacheKey.length > 0) {
                    yield client.del(...cacheKey);
                    const data = next(params);
                    return data;
                }
                else {
                    const data = next(params);
                    return data;
                }
            }
        });
    };
};
exports.prismaRedisCacheHandler = prismaRedisCacheHandler;
