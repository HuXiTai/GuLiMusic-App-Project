import request from "../../utils/request"
import pubSub from "pubsub-js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    songId: "",
    songInfo: {},
    songUrl: ""
  },

  //播放或暂停音乐函数
  playOrPauseMusic() {
    this.data.isPlay ? this.player.play() : this.player.pause()
  },

  //点击播放按钮时
  handleMusicPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    this.playOrPauseMusic()
  },

  //点击上一曲或下一曲时
  handleSwitch(e) {
    const type = e.target.id
    //发布
    pubSub.publish("type", type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      songId: options.songId,
      isPlay: true
    })
    //获取歌曲详情的信息
    await this.getSongInfo()
    //获取歌曲地址
    await this.getSongUrl()
    //播放音乐
    this.player = wx.getBackgroundAudioManager() //创建音频管理器
    this.player.src = this.data.songUrl
    this.player.title = this.data.songInfo.songName

    //同步系统的播放控制和自己的播放控制
    this.player.onPlay(() => {
      this.setData({
        isPlay: true
      })
    })
    this.player.onPause(() => {
      this.setData({
        isPlay: false
      })
    })

    //订阅下一曲或上一曲的ID
    pubSub.subscribe("newId", async (_, newId) => {
      this.setData({
        songId: newId,
      })
      //获取歌曲详情的信息
      await this.getSongInfo()
      //获取歌曲地址
      await this.getSongUrl()
      //播放音乐
      this.player.src = this.data.songUrl
      this.player.title = this.data.songInfo.songName
    })

  },

  //获取歌曲详情的信息
  async getSongInfo() {
    const re = await request("/song/detail", { ids: this.data.songId })
    if (re.code === 200) {
      this.setData({
        songInfo: {
          songName: re.songs[0].name,
          songImg: re.songs[0].al.picUrl
        }
      })
      // wx.setNavigationBarTitle({
      //   title: this.data.songDetail.songName,
      // })
    }
  },

  //获取歌曲地址
  async getSongUrl() {
    const re = await request("/song/url", { id: this.data.songId })
    if (re.code === 200) {
      this.setData({
        songUrl: re.data[0].url
      })
    }
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