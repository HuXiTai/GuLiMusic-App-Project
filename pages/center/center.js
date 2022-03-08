// pages/center/center.js
let startY = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveY: "",
    transition: "",
    userInfo: {},
    recordInfo: {}
  },

  //手指按下时调用
  handlerStart(e) {
    this.setData({
      transition: ""
    })
    //获取鼠标开始位置
    startY = e.changedTouches[0].clientY
  },
  //手指移动时调用
  handlerMove(e) {
    this.setData({
      moveY: (e.changedTouches[0].clientY - startY) * 2 < 0 ? 0 + "rpx" : (e.changedTouches[0].clientY - startY) * 2 + "rpx"
    })

  },
  //手指结束移动时调用
  handlerEnd(e) {
    this.setData({
      moveY: 0,
      transition: "all 1s"
    })
  },

  //点击登录时
  toLogin(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo_key')
    })

    this.setData({
      recordInfo: wx.getStorageSync('recordInfo_key')
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})