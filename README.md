# junho-mobile-touch
junho-mobile-touch是一个移动触摸事件库,支持双击、单击、长按事件等
* 目前仅支持移动端使用

## Installation
* npm install --save-dev junho-mobile-touch

## Usege
```
  import { Swiper } from 'junho-mobile-touch'

  new Swiper(domElement, className, swiperType, callback)
```

## Events
 方法名  | 说明  |   参数  |
 ----      | ----- | ------ |
 Swiper | 用于手机端滑动特效 |  (domElement: element, className: string, swiperType: string, callback: func) |
 TouchTag | 手机触摸事件 | (element: element, callback: func) |

## example
react实战例子: [抖音WebApp](https://github.com/JunhoChan/tiktokApp)

> 有问题请提交Issure，本人会及时处理
