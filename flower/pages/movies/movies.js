// pages/movies/movies.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
  },

  onGoToMore(event) {
    console.log(event)
    wx.navigateTo({
      url: `/pages/more-movie/more-movie?type=${event.currentTarget.dataset.type}`
    })
  },

  onConfirm(event) {
    wx.request({
      url: "http://t.talelin.com/v2/movie/search",
      data: {
        q: event.detail.value
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    app.getData("abc")
    wx.request({
      url: 'http://t.talelin.com/v2/movie/in_theaters',
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          inTheaters: res.data.subjects
        })
      }
    })

    wx.request({
      url: 'http://t.talelin.com/v2/movie/coming_soon',
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          comingSoon: res.data.subjects
        })
      }
    })

    wx.request({
      url: 'http://t.talelin.com/v2/movie/top250',
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          top250: res.data.subjects
        })
      }
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