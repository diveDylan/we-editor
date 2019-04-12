const regeneratorRuntime = require('../libs/regenerator-runtime')
import wxApi from '../libs/wx-api-promise/index'
let img = {}

// 选择单张图片图片
img.choose = async (limit=5) => {
   let { success, res } = await wxApi.chooseImage({
      count: 1, // 图片数
      sizeType: ['original'],// 选取原图
      sourceType: ['album', 'camera'],
    })
    if(success) {
      if(res.tempFiles[0].size > limit * 1024 * 1024) {
        wx.showToast({
          icon: 'none',
          title: `图片大小不能超过${limit}M`,
        })
        return null
      }
      return res.tempFiles
    }
    return null
}

// 读取图片信息
img.getInfo = async (src) => {
  let { success, res} = await wxApi.getImageInfo({ src })
  console.log(res)
  return success ? res : null
}

// 图片上传
img.upload = async (src, server, quality) => {
  let filePath = await img.compress(src, quality)
  const fileRes = await wxApi.uploadFile({
    url: `${server}`,
    filePath,
    name: 'file'
  })
  return JSON.parse(fileRes.res.data)
}
// 图片压缩
img.compress = async (src, quality=80) => {
 let { success, res } = await  wxApi.compressImage({ src, quality, })
 console.log(res)
 // 失败则原路径
 return success ? res.tempFilePath : src
}

export default img
