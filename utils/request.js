function request(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://localhost:3000${url}`,
      // url: `http://4p717s2161.qicp.vip${url}`,
      method,
      data,
      header: {
        cookie: wx.getStorageSync('cookies_key') && wx.getStorageSync('cookies_key').find(item => item.startsWith('MUSIC_U'))
      },
      success: (res) => {
        if (data.type === "login") {
          wx.setStorageSync("cookies_key", res.cookies)
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request