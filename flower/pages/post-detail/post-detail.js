// pages/post-detail/post-detail.js

import postList from "../../data/data.js"

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    _pid: null,
    collected: false,
    postCollect: {},
    isPlaying: false,
    _mgr: null
  },

  onCollect() {
    const postCollect = this.data.postCollect || {}
    
    postCollect[this.data._pid] = !this.data.collected
    wx.setStorageSync('posts_collected', postCollect)

    this.setData({
      collected: !this.data.collected
    })

    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消收藏',
    })
  },

  onShare() {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信'],
    })
  },

  onMusic(event) {
    const mgr = this.data.mgr
    const {url, title, coverImg} = this.data.postData.music    

    this.setData({
      isPlaying: !this.data.isPlaying
    })

    if(this.data.isPlaying) {
      mgr.src = url
      mgr.title = title
      mgr.coverImgUrl = coverImg
    }else{
      mgr.pause()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid
    const postCollect = wx.getStorageSync('posts_collected')
    const collected = postCollect[this.data._pid]
    
    this.setData({
      postCollect, 
      collected, 
      postData,
      isPlaying: app.gIsPlayingPostId === options.pid ? app.gIsPlayingMusic : false
    })

    this.data.mgr = wx.getBackgroundAudioManager()

    this.data.mgr.onPlay(() => {
      this.setData({
        isPlaying: true
      })
      app.gIsPlayingMusic = true
      app.gIsPlayingPostId = this.data._pid
    })

    this.data.mgr.onPause(() => {
      this.setData({
        isPlaying: false
      })
      app.gIsPlayingMusic = false
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