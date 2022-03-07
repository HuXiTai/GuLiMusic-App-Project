function request(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://localhost:3000${url}`,
      method,
      data,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request