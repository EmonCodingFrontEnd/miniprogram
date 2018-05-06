//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    serverData: '点击获取内容',
    copyData: '点击复制内容'
  },
  //事件处理函数
  bindViewTap: function () {
    /**
     * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
     * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
     */
    wx.navigateTo({
      url: '../test/test?title="我来自首页"'
    })
  },
  getData: function () {
    var $this = this;
    wx.request({
      url: app.globalData.hostssl + '/wechat/mini/message',
      method: 'GET',
      data: {
        name: '李明',
        age: 31
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        $this.setData({ serverData: res.data });
      }
    })
  },
  copy: function () {
    var $this = this;
    if (wx.setClipboardData) {
      wx.setClipboardData({
        data: '想要复制的内容',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res);
              $this.setData({ copyData: res.data });
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前版本过低，请及时升级',
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
