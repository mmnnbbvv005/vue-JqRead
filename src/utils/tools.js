// 全局小工具js
// import store from '@/store'
// import MessageBox from '@/components/Layout/Popup/message-box/'

/**
 * 跳转路由或http链接
 * @param { String } route 路由值或http链接字符串
 */
import router from '@/router'
export function RouterLink (route) {
  if (!route) return
  if (typeof route === 'string' && route.indexOf('miniapp://') === 0) {
    window.wx.miniProgram.reLaunch({ url: route.replace('miniapp://', '/') })
  } else if (
    typeof route === 'string' && (route.indexOf('http') === 0 || route.indexOf('/api') === 0)
  ) {
    location.href = route
  } else {
    router.push(route)
  }
}

export function screenAdaptation () {
  var clientW = document.body.clientWidth
  var scale = 640 / 100 // 当屏幕 = 640px时，html根字体 = 100px
  document.getElementsByTagName('html')[0].style.fontSize = clientW / scale + 'px'
}
