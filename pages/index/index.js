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
    add: false,
    i: 0,
    timezone: [], // all
    tz: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let current = moment.tz.guess();
    this.setData({
      timezone: timezone.tz,
      tz: [current],
      i: timezone.tz.indexOf(current)
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
      clocks: clocks
    });
  },
  onClickAdd: function () {
    if (!this.data.add) {
      this.setData({
        add: true
      });
    } else {
      this.data.tz.push(this.data.timezone[this.data.i]);
      this.setData({
        add: false,
        tz: this.data.tz
      });
      this.setClocks();
    }
  },
  onClickCancel: function () {
    this.setData({
      add: false
    });
  },
  onClickDelete: function (e) {
    let index = parseInt(e.target.dataset.index, 10);
    this.data.tz.splice(index, 1);
    this.setData({
      tz: this.data.tz
    })
    this.setClocks();
  },
  onSelect: function (e) {
    this.setData({
      i: e.detail.value
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    if (this.data.tick !== null) {
      let that = this;
      this.data.tick = setInterval(function tick () {
        that.setClocks();
      }, 1000);
    }
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