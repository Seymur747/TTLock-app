import * as crypto from 'crypto-js'

export const hashMd5 = (text: string): string => {
    const md5Hash = crypto.MD5(text).toString()
    return md5Hash
}
