import wxApi from '../libs/wx-api-promise/index'
import { server } from '../global/index.js'
// await async
const regeneratorRuntime = require('../../libs/regenerator-runtime')

// isObject
const isObject = val => Object.prototype.toString.call(val) === '[object, Object]'

export default async ({ url, method, params, headers, isWechatServer = false }) => {
  // 判断网络状况
  const getNetworkTypeRes = await wxapi.getNetworkType()

  if (getNetworkTypeRes.networkType === 'none') {
    return {
      returnCode: CUSTOMCODE.OFFLINE,
      returnMsg: '网络不通，请联网后重试。'
    }
  }

  const res = await wxapi.request({
    // 如果是调用微信内部接口将不走server
    url: isWechatServer ? '' + url : server + url,
    // if u need add some base headers use Object.assign({}, headers, baseHeaderParams)
    header: header,
    data: params ? params : {},
    method: method
  })

  if (res.res && isObject(res.res.data)) {
    // do something when u get data such as respCode, respMsg, content or data
    return res.res.data
  }
  return res
}
