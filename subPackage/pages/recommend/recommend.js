import request from "../../../utils/request"
import pubSub from "pubsub-js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    month: "",
    songList: [],
    songId: ""
  },

  //点击歌曲去往详情
  toDetail(e) {
    const songId = e.currentTarget.id
    this.setData({
      songId
    })
    wx.navigateTo({
      url: `/subPackage/pages/songDetails/songDetails?songId=${songId}`,
    })
  },

  //获取同日推荐的歌曲列表
  async getSongList() {
    const re = await request("/recommend/songs")
    if (re.code === 200) {
      this.setData({
        songList: re.recommend.map(item => {
          return {
            id: item.id,
            songImg: item.album.picUrl,
            songName: item.name,
            songer: item.artists[0].name
          }
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      date: new Date().getDate(),
      month: new Date().getMonth() + 1
    })

    await this.getSongList()


    //订阅
    pubSub.subscribe("type", (_, type) => {
      let { songList, songId } = this.data
      let nowIndex = songList.findIndex(item => item.id === songId * 1)
      let newIndex = -1
      if (type === "prev") {
        newIndex = nowIndex - 1 < 0 ? songList.length - 1 : nowIndex - 1
      } else {
        newIndex = nowIndex + 1 > songList.length - 1 ? 0 : nowIndex + 1
      }
      this.setData({
        songId: songList[newIndex].id
      })

      //发布上一曲或下一曲的ID
      pubSub.publish("newId", this.data.songId)
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