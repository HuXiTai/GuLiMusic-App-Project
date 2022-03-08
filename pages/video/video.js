import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    navId: "",
    videoList: {},
    vid: "",
    recordList: [],
    isRefresh: false
  },

  //点击视频播放或暂停
  playOrPause(e) {
    let vid = e.target.id
    this.setData({
      vid
    })
    if (!this.player) {
      //第一次播放
      //创建视频上下文对象
      this.player = wx.createVideoContext(vid)
      this.player.play()
      //保存旧的vid
      this.oldVid = vid
      this.status = true
    } else {
      //非第一次播放
      //判断是否是同一个视频
      if (vid === this.oldVid) {
        if (this.status) {
          this.player.pause()
          this.status = false
        } else {
          let obj = this.data.recordList.find(item => item.vid === this.data.vid)
          obj && this.player.seek(obj.currentTime)
          this.player.play()
          this.status = true
        }
      } else {
        //点击的不是同一个
        //暂停老的视频执行上下文
        this.player.pause()
        //创建新的视频执行上下文覆盖老的
        this.player = wx.createVideoContext(vid)

        //判断是否有记录
        let obj = this.data.recordList.find(item => item.vid === this.data.vid)
        obj && this.player.seek(obj.currentTime)
        this.player.play()
        //保存旧的vid
        this.oldVid = vid
        this.status = true
      }
    }
  },

  //上拉刷新时
  handlerRefresh() {
    this.setData({
      isRefresh: true
    })
    this.getVideoList().then(() => {
      this.setData({
        isRefresh: false
      })
    })

  },

  //上拉触底时
  handlerScrolltolower() {
    console.log(123);
    let videoList = this.data.videoList

    videoList = [...videoList, ...videoList]

    videoList.length < 40 && this.setData({ videoList })
  },

  //视频播放完时
  handlerEnded() {
    let recordList = this.data.recordList
    let index = recordList.findIndex(item => item.vid === this.data.vid)
    recordList.slice(index, 1)
    this.setData({
      recordList
    })
  },

  //保存视频的播放记录
  //视频播放就会触发
  handlerTimeupdate(e) {
    let recordList = this.data.recordList
    let obj = recordList.find(item => item.vid === this.data.vid)
    if (obj) {
      obj.currentTime = e.detail.currentTime
    } else {
      obj = {
        vid: this.data.vid,
        currentTime: e.detail.currentTime
      }
      recordList.push(obj)
    }
    this.setData({
      recordList
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList()
  },

  //获取视频导航栏信息
  async getNavList() {
    const re = await request('/video/group/list')
    if (re.code === 200) {
      this.setData({
        navList: re.data.slice(0, 15),
        navId: re.data[0].id
      })

      this.getVideoList()
    }
  },

  //点击时评导航时
  clickNav(e) {
    this.setData({
      navId: e.target.id * 1
    })

    this.getVideoList()
  },

  //获取导航的视频
  async getVideoList() {
    const re = await request('/video/group', { id: this.data.navId })
    if (re.code === 200) {
      this.setData({
        videoList: re.datas.map(item => item.data)
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },


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
  onShareAppMessage: function ({ from }) {
    if (from === "buttom") {
      return {
        title: "这是按钮分享",
        path: "/pages/video/vidoe",
        imageUrl: "../../static/images/mylove.jpg"
      }
    } else {
      return {
        title: "这是系统分享",
        path: "/pages/video/vidoe",
        imageUrl: "../../static/images/mylove.jpg"
      }
    }

  }
})