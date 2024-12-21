import COS from 'cos-nodejs-sdk-v5'

import { config } from 'dotenv'

config()

const cosUtil = {
    cos: null,
    Bucket: process.env.COS_BUCKETNAME,  // 存储桶名称
    Region: 'ap-nanjing',   // 存储桶区域
    Prefix: '',   // 路径前缀
    // 初始化配置
    init(config) {
        if (config) {
            this.Bucket = config.Bucket || this.Bucket;
            this.Region = config.Region || this.Region;
            this.Prefix = config.Prefix || this.Prefix;
        }

        // 下面两个密钥，需要在腾讯云获取
        this.cos = new COS({
            SecretId: process.env.COS_API_SECRETID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
            SecretKey: process.env.COS_API_SECRETKEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
        });
    },
    putObject(param, callback) {
        return new Promise((resolve, reject) => {
            const fullKey = this.Prefix ? `${this.Prefix}/${param.key}` : param.key;
            this.cos.putObject({
                Bucket: this.Bucket,
                Region: this.Region,
                Key: fullKey,
                Body: param.buffer,
            }, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data)
            });
        })
    }

}

cosUtil.init()

export default cosUtil