"use strict";
const Service = require("egg").Service;

class CacheService extends Service {
  async getList(key, isChildObject = false) {
    const { redis } = this.app;
    let data = await redis.lrange(key, 0, -1);
    if (isChildObject) {
      data = data.map((item) => {
        return JSON.parse(item);
      });
    }
    return data;
  }
  /**   * 设置列表
   * * @param {string} key 键
   * * @param {object|string} value 值
   * * @param {string} type 类型：push和unshift
   * * @param {Number} expir 过期时间单位秒
   * * @return { Number } 返回索引   */
}