// pages/index/index.js
const moment = require('../../utils/moment-timezone.js');
const timezone = require('../../utils/timezone.js');
Page({
  tick: null,
  data: {
    clocks: [],
    add: false,
    index: 0,
    timezone: [], // all
    tz: ['Asia/Shanghai']
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      timezone: timezone.tz,
      index: timezone.tz.indexOf('Asia/Shanghai')
    });
    for (let i = 0; i < this.data.tz; i++) {

    }
  },
  onClickAdd: function () {
    if (!this.data.add) {
      this.setData({
        add: true
      });
    } else {
      this.data.tz.push(this.data.timezone[this.data.index]);
      this.setData({
        add: false,
        tz: this.data.tz
      });
    }
  },
  onSelect: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})