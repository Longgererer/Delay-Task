import React, { useState, useContext } from 'react'
import { Context } from '../context/content'
import { monthMap, getToday, getMonthInfo } from '../utils/date'

import '../styles/calendar.scss'

export default function Calendar () {
  const { state, dispatch } = useContext(Context)
  // 当前显示在日历中的时间
  const [displayDate, setDisplayDate] = useState(() => state.curDate)
  // 每个日期所对应在日历中的位置
  const [dateArr, setDateArr] = useState(() => calcDatePos(displayDate.year, displayDate.month))
  const today = getToday()

  function handleDateClick (week, day) {
    setDisplayDate({ ...displayDate, week, day })
    dispatch({ type: 'SWITCH_DATE', value: { ...displayDate, week, day } })
    dispatch({ type: 'DISPLAY_DRAWER', value: '' })
  }

  function handleMonthSub () {
    let { month, year } = displayDate
    if (month === 0) {
      month = 11
      year--
    } else {
      month--
    }
    setDisplayDate({ ...displayDate, month, year })
    setDateArr(calcDatePos(year, month))
  }

  function handleMonthAdd () {
    let { month, year } = displayDate
    if (month === 11) {
      month = 0
      year++
    } else {
      month++
    }
    setDisplayDate({ ...displayDate, month, year })
    setDateArr(calcDatePos(year, month))
  }

  const weekMap = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return (
    <div className={`calendar no-select transition ${state.displayDrawer === 'calendar' ? 'calendar-active' : ''}`}>
      <div className="calendar-header flex">
        <div className="left radius-md pointer transition flex flex-jc flex-ac" onClick={() => handleMonthSub()}>
          <i className="icon iconfont icon-left transition"></i>
        </div>
        <div className="display-date-text flex-1 text-md text-center">
          <span>{`${monthMap[displayDate.month]} ${displayDate.year}`}</span>
        </div>
        <div className="right radius-md pointer transition flex flex-jc flex-ac" onClick={() => handleMonthAdd()}>
          <i className="icon iconfont icon-right transition"></i>
        </div>
      </div>
      <div className="calendar-content">
        <table className="calendar-table" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              {
                weekMap.map(item => (
                  <th className="radius-md" key={item}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              dateArr.map((row) => {
                return (
                  <tr key={row}>
                    {
                      row.map((col, index) => {
                        if (col !== 0) {
                          const isToday = judgeDateEqual(today, { ...displayDate, day: col })
                          const isCurDay = judgeDateEqual(state.curDate, { ...displayDate, day: col })
                          return (
                            <td key={index}>
                              <div
                                className={`enable-date pointer text-sm radius-md transition ${isToday ? 'date-today' : ''} ${isCurDay ? 'cur-day' : ''}`}
                                onClick={() => handleDateClick(index, col)}>
                                {col}
                              </div>
                            </td>
                          )
                        } else {
                          return <td className="disable-date" key={index}></td>
                        }
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * 将当月日期填充进数组中，没有的填0
 * @param {Number} year 
 * @param {Number} month 
 * @returns {Array}
 */
function calcDatePos (year, month) {
  const { firstDayPos, daysCount } = getMonthInfo(year, month)
  const dateArr = []
  let acc = 0
  for (let i = 0;i < 6;i++) {
    const tmpArr = []
    for (let j = 0;j < 7;j++) {
      if (i === 0 && j < firstDayPos) {
        tmpArr.push(0)
      } else {
        if (acc >= daysCount) {
          tmpArr.push(0)
        } else {
          tmpArr.push(++acc)
        }
      }
    }
    dateArr.push(tmpArr)
  }
  return dateArr
}

/**
 * 判断两个日期是否相等
 * @param {Object} x 
 * @param {Object} y 
 * @returns 
 */
function judgeDateEqual (x, y) {
  return (
    x.day === y.day &&
    x.month === y.month &&
    x.year === y.year
  )
}