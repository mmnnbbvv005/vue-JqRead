// import store from '@/store'
// import $site from '@/main/siteConfig'

// const guest = $site.tokenName.guest
// const auth = $site.tokenName.auth

// cookie获取、设置、删除
import Cookies from 'js-cookie'

// LocalStorage获取、设置、删除
function LocalStorageConstruct () { }
LocalStorageConstruct.prototype = {
  set: function (key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  },
  get: function (key) {
    var getItem = window.localStorage.getItem(key)
    // console.log('当前获取存储值-' + key + '=' + getItem)
    if (getItem === null || getItem === 'undefined') {
      return null
    } else {
      return JSON.parse(getItem)
    }
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  }
}
const LocalStorage = new LocalStorageConstruct()

// 判断浏览器是否兼容localStorage
export function supportLocalStorageJudge () {
  if (navigator.userAgent.indexOf('UCBrowser') > -1) {
    return false
  }
  var uaFlag = 0
  var uaArr = ['Chrome', 'MQQBrowser', 'QQ', 'TBS', 'wxwork', 'MicroMessenger', 'T7', 'baiduboxapp', 'baidubrowser', 'MiuiBrowser', 'NetType', 'OPR']
  for (var i = 0; i < uaArr.length; i++) {
    if (navigator.userAgent.indexOf(uaArr[i]) > -1) {
      uaFlag = 1
    }
  }
  if (uaFlag !== 1) {
    if (navigator.userAgent.indexOf('HUAWEIEVA') > -1 || navigator.userAgent.indexOf('HUAWEIVTR') > -1) {
      return false
    }
  }
  var testKey = 'test'
  try {
    window.localStorage.setItem(testKey, 'testValue')
    window.localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}
const supportLocalStorage = supportLocalStorageJudge()

// 设置存储信息
export function setStorage (key, value) {
  if (supportLocalStorage) {
    return LocalStorage.set(key, value)
  } else {
    return Cookies.set(key, value)
  }
}

// 获取存储信息
export function getStorage (key) {
  var res
  if (supportLocalStorage) {
    res = LocalStorage.get(key)
  } else {
    res = Cookies.get(key)
  }
  // if (key === guest) {
  //   return res || store.getters[guest]
  // }
  // if (key === auth) {
  //   return res || store.getters[auth]
  // }
  return res
}

// 删除存储信息
export function removeStorage (key) {
  // if (key === guest) {
  //   store.dispatch('ChangeGuestToken', null)
  // }
  // if (key === auth) {
  //   store.dispatch('ChangeAuthToken', null)
  // }
  if (supportLocalStorage) {
    return LocalStorage.remove(key)
  } else {
    return Cookies.remove(key)
  }
}

// LocalStorage获取、设置、删除
function SessionStorageConstruct () { }
SessionStorageConstruct.prototype = {
  set: function (key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  get: function (key) {
    var getItem = window.sessionStorage.getItem(key)
    if (getItem === null || getItem === 'undefined') {
      return null
    } else {
      return JSON.parse(getItem)
    }
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  }
}
export const SessionStorage = new SessionStorageConstruct()

