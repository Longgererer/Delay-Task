import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/content'
import { weekMap, monthMap, compDate, getToday } from '../utils/date'

import '../styles/header.scss'

export default function Header () {
  const { state, dispatch } = useContext(Context)
  const curDate = state.curDate
  const [stat, setStat] = useState(0)
  const [addDisable, setAddDisable] = useState(false)

  function handleCalendarState () {
    dispatch({ type: 'DISPLAY_DRAWER', value: 'calendar' })
  }

  function handleAddDialogState () {
    dispatch({ type: 'DISPLAY_DRAWER', value: 'form' })
  }

  useEffect(() => {
    // 如果当前显示日期小于今日，则禁止点击add按钮
    if (compDate(state.curDate, getToday()) === -1) {
      setAddDisable(true)
    } else {
      setAddDisable(false)
    }
  }, [state.curDate])

  useEffect(() => {
    // 重新计算任务的完成进度
    const curTaskList = state.curTaskList
    let accomplishNum = 0
    curTaskList.map(item => {
      if (item.state === 'Accomplish') accomplishNum++
    })
    setStat(`${accomplishNum} / ${curTaskList.length}`)
  }, [state.curTaskList])

  return (
    <div className="header no-select">
      <div className="header-row-1 flex flex-ac">
        <span className="header-date text-sm">{curDate.day} {monthMap[curDate.month]} {curDate.year}</span>
        <i className="icon iconfont icon-calendar pointer text-xl transition" onClick={() => handleCalendarState()}></i>
        <div className="flex-1"></div>
        <div className="tasks-num text-sm">Tasks: {stat}</div>
      </div>
      <div className="header-row-2 flex flex-ac">
        <span className="header-date text-xl">{weekMap[curDate.week]}</span>
        <div className="flex-1"></div>
        <button className="add-btn circle transition pointer flex flex-ac flex-jc" disabled={addDisable} onClick={() => handleAddDialogState()}>
          <i className="icon iconfont icon-add text-md transition"></i>
        </button>
      </div>
    </div>
  )
}