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
    currentIndex: -1
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
  // 删除 删除来源下标
  delete(index) {
    let list = this.data.list
    let preIndex = index - 1
    console.log('current:',this.data.currentIndex,'pre:', preIndex, 'listPre:', list[preIndex])
    if(!list[preIndex].src && list[preIndex].text) {
      this.setData({
        currentIndex: preIndex
      })
    }else {
      list[preIndex].src = null
      this.setData({
        list
      })
    }

  },
  // 非输入框 失焦
  blur(e) {
    console.log('type: blur', e)
    // this.currentIndex = -1
    if(e.detail.value === '') { 
      // 触发更新list 删除文本
      const list = [...this.data.list]
      console.log(list[e.target.dataset.index].src)
      // 有图片文本为null
      if(list[e.target.dataset.index].src) list[e.target.dataset.index].text = null
      // 无图删除这一项
      else list.splice(e.target.dataset.index, 1)
      this.setData({ list })
    }
  },
  // 点击完成
  finish() {

  },
  // 输入框点击
  textareaTap(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  // 每个输入框的输入
  input(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    // 触发删除的情况
    if(this.data.list[index].text === '' && e.detail.keyCode == 8 && index > 0 ) {
      this.delete(index)
    }else {
      // 输入的情况
      this.setData({
        [`list[${index}].text`]: e.detail.value
      })
    }
  },
  // 增加text
  inputAdd(e) {
    console.log(e.detail)
    // keycode === 8并且输入已为空的情况触发删除
    if(this.data.descAdd === '' && e.detail.keyCode == 8  && this.data.list.length > 0) { // 删除
      this.delete(this.data.list.length)
      return ;
    }
    this.setData({
      descAdd: e.detail.value
    })
  },
  // 插入图片
  async addImage() {
    let res = await img.choose()
    let compressUrl = res && await img.compress(res[0].path)
    // 无论是否压缩成功都会有路径，取消的时候为null
    if(compressUrl) {
      this.setData({
        list: this.data.list.concat({
          src: compressUrl,
          text: this.data.descAdd
        }),
        // 重置输入框
        descAdd: '',
        currentIndex: -1
      })
    }
  }

})