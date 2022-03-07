import request from "../../utils/request"
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    personalizedList: [],
    tapList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //请求获取轮播图信息
  async getBannerInfo() {
    const re = await request("/banner", { type: 2 })
    if (re.code === 200) {
      this.setData({
        bannerList: re.banners
      })
    }
  },

  //请求精心推荐信息
  async getPersonalizedInfo() {
    const re = await request("/personalized", { limit: 20 })
    if (re.code === 200) {
      this.setData({
        personalizedList: re.result
      })
    }
  },

  //请求排行榜信息
  async getTopInfo() {
    for (let i = 0; i <= 3; i++) {
      let re = await request("/top/list", { idx: i })
      if (re.code === 200) {
        this.setData({
          tapList: [...this.data.tapList, {
            id: re.playlist.id, name: re.playlist.name, tracks: re.playlist.tracks.slice(0, 3).map(item => {
              return { songName: item.name, songImg: item.al.picUrl, id: item.id }
            })
          }]
        })
      }
    }
  },

  onLoad: function (options) {
    //请求获取轮播图信息
    this.getBannerInfo()

    //请求精心推荐信息
    this.getPersonalizedInfo()

    //请求排行榜信息
    this.getTopInfo()

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