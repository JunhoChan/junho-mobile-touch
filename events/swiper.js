/**
 * @param {element}  elementNode        根元素节点
 * @param {String}   childNodeClassName 子元素类名称
 * @param {String}   type               类型
 * @param {Function} callback           回调
 */
function Swiper(elementNode, childNodeClassName, type, callback) {
  this.swiperType = type || 'verticle'
  this.elementNode = elementNode || undefined
  this.x1 = 0
  this.x2 = 0
  this.startX = 0
  this.currentX = 0
  this.y1 = 0
  this.y2 = 0
  this.startY = 0
  this.currentY = 0
  this.childNodeClassName = childNodeClassName || ''
  this.callback = callback || null
  this.storageInfo = {
    translateX: 0,
    translateY: 0
  }// storage info
  return this
}

Swiper.prototype = {
  /**
   * register touch event
   */
  _resisterTouchEvent(ev) {
    if (!window) {
      console.error('unable to get the current browser window object, service failed to registe')
      return false
    }
    this._detroyTouchEvent()
    this.elementNode.addEventListener('touchstart', () => this._switchTouchEvent() )
    this.elementNode.addEventListener('touchmove', () => this._switchTouchEvent())
    this.elementNode.addEventListener('touchend', () => this._switchTouchEvent())
  },
  _switchTouchEvent(ev) {
    const event = ev || window.event
    switch(event.type) {
      case 'touchstart': 
        this.x1 = event.changedTouches[0].clientX
        this.y1 = event.changedTouches[0].clientY
        this.startX = this.storageInfo['translateX'] || 0
        this.startY = this.storageInfo['translateY'] || 0
        break
      case 'touchmove': 
        this.x2 = event.changedTouches[0].clientX
        this.y2 = event.changedTouches[0].clientY
        this.currentX = this.startX + this.x2 - this.x1
        this.currentY = this.startY + this.y2 - this.y1
        this.storageInfo['translateX'] = this.currentX
        this.storageInfo['translateY'] = this.currentY
        // this.elementNode.style.transform = 'translateY(' + this.currentY + 'px)'
        break
      case 'touchend':
        this._handleMoveEndEvent()
        break
    }
  },
  // 判断当前操作是上下滑动的姿势还是左右滑动的姿势
  _getSinAndSsAllowedHSwipe() {
    const xDistance = Math.floor(Math.abs(this.x1-this.x2))
    const yDistance = Math.floor(Math.abs(this.y1-this.y2))
    const subDistance = Math.floor(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)))
    const sinAngle = yDistance / subDistance
    return sinAngle < 0.5
  },
  _handleMoveEndEvent() {
    const childElements = this.elementNode.querySelectorAll('.' + this.childNodeClassName)
    this.elementNode.style.transition = '.5s'
    switch(this.swiperType) {
      case 'verticle': 
        let offsetY = Math.min(this.storageInfo.translateY || 0, 0)
        offsetY = Math.max(-(childElements.length -1) * childElements[0].offsetHeight , offsetY)
        const offsetNumY = Math.abs(Math.round(-offsetY/childElements[0].offsetHeight))
        const currentY = offsetNumY * - childElements[0].offsetHeight
        if (!this._getSinAndSsAllowedHSwipe()) {
          this.elementNode.style.transform = 'translateY(' + currentY + 'px)'
          this.callback && this.callback(offsetNumY)
        }
        break
      case 'horizontal':
        let offsetX = Math.min(this.storageInfo.translateX || 0, 0)
        offsetX = Math.max(-(childElements.length -1) * childElements[0].offsetWidth , offsetX)
        const offsetNumX = Math.abs(Math.round(-offsetX/childElements[0].offsetWidth))
        const currentX = offsetNumX * -childElements[0].offsetWidth
        if (!!this._getSinAndSsAllowedHSwipe()) {
          this.elementNode.style.transform = 'translateX(' + currentX + 'px)'
          this.callback && this.callback(offsetNumX)
        }
        break
    }
  },
  _detroyTouchEvent() {
    this.elementNode.removeEventListener('touchstart', this._switchTouchEvent)
    this.elementNode.removeEventListener('touchmove', this._switchTouchEvent)
    this.elementNode.removeEventListener('touchend', this._switchTouchEvent)
  },
  sartOrResumeSwiper() {
    if (!this.elementNode || !this.childNodeClassName) {
      console.error('initialization failed due to missing parameters!')
      return false
    }
    this._resisterTouchEvent()
  },
  stopSwiper() {
    this._detroyTouchEvent()
  }
}


module.exports = Swiper