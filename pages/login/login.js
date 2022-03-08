import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",

  },

  //用户输入密码或账号时
  handlerInput(e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },

  //点击登录时
  async login() {
    const re = await request("/login/cellphone", { phone: this.data.phone, password: this.data.password, type: "login" })

    console.log(re);
    if (re.code === 400) {
      wx.showToast({
        title: "手机号错误"
      })
    } else if (re.code === 502) {
      wx.showToast({
        title: "密码错误"
      })
    } else {
      wx.showToast({
        title: "登陆成功"
      })
      wx.setStorageSync("userInfo_key", re.profile)
      this.getRecordInfo()
      wx.reLaunch({
        url: '/pages/center/center',
      })


    }
  },

  //发送历史记录的请求
  async getRecordInfo() {
    const re = await request("/user/record", { uid: wx.getStorageSync('userInfo_key').userId, type: 0 })
    console.log(re);
    if (re.code === 200) {
      wx.setStorageSync("recordInfo_key", re.allData.slice(0, 15).map(item => {
        return {
          id: item.song.al.id,
          imgUrl: item.song.al.picUrl
        }
      }))
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: "",
      password: ""
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