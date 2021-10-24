import React, { useContext } from 'react'
import { Context } from '../context/content'
const { ipcRenderer } = require('electron')

import '../styles/appTitle.scss'

export default function AppTitle () {
  const { state, dispatch } = useContext(Context)

  function minimize () {
    ipcRenderer.send('min-app')
  }

  function close () {
    // 退出程序前存储当天数据
    dispatch({ type: 'SAVE_CURDAY_DATA' })
    ipcRenderer.send('close-app')
  }

  function settings () {
    dispatch({ type: 'SHOW_SETTINGS', value: !state.showSettings })
  }

  return (
    <div className="app-title flex flex-ac no-select">
      <span className="app-name text-sm">Delay Task</span>
      <div className="flex-1"></div>
      <div className="app-opts flex">
        <div className={`settings text-center transition pointer ${state.showSettings ? 'settings-active' : ''}`} onClick={settings}>
          <i className="icon iconfont icon-settings text-lg"></i>
        </div>
        <div className="minimize text-center transition pointer" onClick={minimize}>
          <i className="icon iconfont icon-minimize text-sm"></i>
        </div>
        <div className="close text-center transition pointer" onClick={close}>
          <i className="icon iconfont icon-close text-sm"></i>
        </div>
      </div>
    </div>
  )
}