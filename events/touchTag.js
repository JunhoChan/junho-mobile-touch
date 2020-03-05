
function TouchTag(element, calback) {
  this.element = element || null
  this.startTouchTime = 0
  this.endTouchTime = 0
  this.lastTouchTime = 0
  this.touchCount = 0
  this.callback  = calback || undefined
  this.touchType = 'simple' // simple double long
  return this._init()
}


TouchTag.prototype = {
  /* 初始化方法，获取当前query对象的方法 */
  
  _init: function (){
    if (this.element){
        return this;
    }
    console.error('initialization failed due to missing parameters!')
    return undefined
  },
  /** 注册touch事件 */
  _registerTouchEvent() {
    this.element.addEventListener("touchstart", () => this._touchFn())
    this.element.addEventListener("touchmove", () => this._touchFn())
    this.element.addEventListener("touchend", () => this._touchFn())
  },
  _touchFn(ev) {
    const event = ev || window.event
    event.preventDefault()
    switch (event.type) {
      case "touchstart":
        this.startTouchTime = new Date().getTime();
        this.Touc
        break;
      case "touchmove":
        break;
      case "touchend":
        this.lastTouchTime = this.endTouchTime;
        this.endTouchTime = new Date().getTime()
        const subTime = this.endTouchTime - this.startTouchTime
        // record count
        this.touchCount++
        // simple tab
        if (this.endTouchTime - this.lastTouchTime >= 500) {
          this.touchCount = 0;
          this.callback && this.callback('simple')
          return false;
        }
        // longTap
        if (subTime > 1500) {
          this.touchCount = 0;
          this.callback && this.callback('long')
        } else if (subTime < 100 && this.touchCount > 1) {
          this.callback && this.callback('double')
          // double tap
        }
        break;
    }
  },
  startTouchTag() {
    this._registerTouchEvent()
  },
  destroyTouchInstance() {
    this.element.removeEventListener("touchstart", () => this._touchFn())
    this.element.removeEventListener("touchmove", () => this._touchFn())
    this.element.removeEventListener("touchend", () => this._touchFn())
    this.element = null
  }
  
}

module.exports = TouchTag
