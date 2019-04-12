// src/pages/editor/index.js
const regeneratorRuntime = require('../../libs/regenerator-runtime')
import img from '../../utils/image.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    descAdd: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // editor onchange
  onChange() {

  },
  // 点击完成
  finish() {

  },
  // 增加text
  inputAdd(e) {
    this.setData({
      descAdd: e.detail.value
    })
  },
  // 插入图片
  async addImage() {
    let res = await img.choose()
    console.log(this.data.list)
    console.log('choose', res)
    let compressUrl = res && await img.compress(res[0].path)
    this.setData({
      list: this.data.list.concat({
        src: compressUrl,
        text: this.data.descAdd
      }),
      // 重置输入框
      descAdd: ''
    })
  }

})