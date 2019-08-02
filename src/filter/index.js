export const dateAllFilter = function (time) {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? ('0' + month) : month
  let day = date.getDate()
  day = day < 10 ? ('0' + day) : day
  let hour = date.getHours()
  hour = hour < 10 ? ('0' + hour) : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  let seconds = date.getSeconds()
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
}

export const dateYearFilter = function (time) {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? ('0' + month) : month
  let day = date.getDate()
  day = day < 10 ? ('0' + day) : day
  return year + '-' + month + '-' + day
}
/**
 * X月X日
 * @param {*} time
 */

export const dateMonthFilter = function (time) {
  if (!time) return ''
  let date = new Date(time)
  let month = date.getMonth() + 1
  month = month < 10 ? ('0' + month) : month
  let day = date.getDate()
  day = day < 10 ? ('0' + day) : day
  return month + '月' + day + '日'
}

export const hoursFilter = function (time) {
  if (!time) return ''
  let date = new Date(time)
  let hour = date.getHours()
  hour = hour < 10 ? ('0' + hour) : hour
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  return hour + ':' + minute
}
