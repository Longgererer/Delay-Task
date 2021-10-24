const weekMap = ['SunDay', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

/**
 * 获取当天信息
 * @returns {Object}
 */
function getToday () {
  const date = new Date()
  const day = date.getDate()
  const week = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear()
  return { day, week, month, year }
}

/**
 * 获取月份的信息
 * @param {Number} year 
 * @param {Number} month 
 * @returns {Object}
 */
function getMonthInfo (year, month) {
  let curDate = new Date(`${year}-${month + 1}-1`)
  const firstDayPos = curDate.getDay()
  curDate = new Date(year, month + 1)
  curDate.setDate(0)
  return {
    firstDayPos, // 一个月的第一天在一星期中的位置
    daysCount: curDate.getDate() // 一个月的总共天数
  }
}

/**
 * 比较两个日期的大小
 * @param {Object} x 
 * @param {Object} y 
 * @returns 
 */
function compDate (x, y) {
  const a = new Date(x.year, x.month, x.day).getTime()
  const b = new Date(y.year, y.month, y.day).getTime()
  return a > b ? 1 : a === b ? 0 : -1
}


export {
  getToday,
  getMonthInfo,
  compDate,
  weekMap,
  monthMap
}