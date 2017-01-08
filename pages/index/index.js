// pages/index/index.js
const moment = require('../../utils/moment-timezone.js');
const timezone = require('../../utils/timezone.js');

function padding (x) {
  return x < 10 ? `0${x}` : `${x}`;
}

Page({
  tick: null,
  data: {
    clocks: [],
    tick: null,
    flash: false,
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
    this.setClocks();
    const that = this;
    this.data.tick = setInterval(function tick () {
      that.setClocks();
    }, 1000);
  },
  setClocks: function () {
    let clocks = [], tz, t;
    for (let i = 0; i < this.data.tz.length; i++) {
      tz = this.data.tz[i];
      t = moment().tz(tz);
      clocks.push({
        h: padding(t.hour()),
        m: padding(t.minute()),
        s: padding(t.second())
      });
    }
    this.setData({
      clocks: clocks,
      flash: !this.data.flash
    });
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
    if (this.data.tick !== null) {
      clearInterval(this.data.tick);
      this.setData({
        tick: null
      });
    }
  },
  onUnload:function(){
    // 页面关闭
  }
})