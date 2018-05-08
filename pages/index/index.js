//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    row: [],
    col: [],
    all: []
  },
  onShareAppMessage: function () {
    return {
      title: '五子棋(单机版)',
      desc: '不服就来战',
      path: '/pages/index'
    }
  },
  onLoad: function () {
    this.setData({
      row: this.getArray(),
      col: this.getArray(),
      all: this.getRowCol()
    })
    Array.prototype.ct = function(c){
      var reg = new RegExp(c+"+","g")
         ,t = this.join('').match(reg) || []
         ,m = 0;
      for(var i=0,j=t.length;i<j;i++){
          m = Math.max(t[i].length,m)
      }
      return m;
    }
  },
  
  getRowCol (n = 10) {
    let array = []
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        array.push(0)
      }
    }
    return array
  },
  getArray (n = 10) {
    let array = []
    for(let i = 0; i < n; i++) {
      array.push(i)
    }
    return array
  },
  dian (event) {
    let row = event.target.dataset.row
    let col = event.target.dataset.col
    let itemIndex = row * 10 + col
    if (this.data.all[itemIndex]!==0) {
      return
    }
    let qi = 1
    if ((this.data.all.filter(x => x!==0).length) % 2 === 1){
      qi = 2
    }
    this.setData({["all["+itemIndex+"]"]:qi})
    this.isWin(row,col,qi)
  },
  isWin(row,col,qi) {
    let data = this.data.all
    let shu = []
    // 竖向
    for(let i=(row-4<0?0:row-4); i<=(row+4>9?9:row+4); i++){
      if(row*10+col<100){
        shu.push(data[i*10+col])
      }
    }
    if(shu.ct(qi)>=5){
      wx.showToast('you win')
      this.setData({
        all: this.getRowCol()
      })
      return
    }
    shu = []
    // 横向
    for(let i=(col-4<0?0:col-4); i<=(col+4>9?9:col+4); i++){
      if(row*10+i<100){
        shu.push(data[row*10+i])
      }
    }
    console.log(shu)
    if(shu.ct(qi)>=5){
      wx.showToast('you win')
      this.setData({
        all: this.getRowCol()
      })
      return
    }
    shu = []
    // 撇向
    shu.push(data[row*10+col])
    for(let i=col-1; i>=(col-4<0?0:col-4); i--){
      if(row-(col-i) >= 0 && (row-(col-i))*10+i<100){
        shu.push(data[(row-(col-i))*10+i])
      }
    }
    shu.reverse()
    for(let i=col+1; i<=(col+4>9?9:col+4); i++){
      if(row+(i-col) <= 9 && (row+(i-col))*10+i<100){
        shu.push(data[(row+(i-col))*10+i])
      }
    }
    if(shu.ct(qi)>=5){
      wx.showToast('you win')
      this.setData({
        all: this.getRowCol()
      })
      return
    }
    shu = []
    // 捺向
    shu.push(data[row*10+col])
    for(let i=col-1; i>=(col-4<0?0:col-4); i--){
      if(row+(col-i) <= 9 && (row+(col-i))*10+i<100){
        shu.push(data[(row+(col-i))*10+i])
      }
    }
    shu.reverse()
    for(let i=col+1; i<=(col+4>9?9:col+4); i++){
      if(row-(i-col) >= 0 && (row-(i-col))*10+i<100){
        shu.push(data[(row-(i-col))*10+i])
      }
    }
    if(shu.ct(qi)>=5){
      wx.showToast('you win')
      this.setData({
        all: this.getRowCol()
      })
      return
    }
    shu = []
  }
})
