import React, { useContext, useEffect } from 'react'
import { Context } from '../context/content'
import { version } from '../../package.json'
import useNotification from '../context/notification'
import Switcher from './switcher'
const { ipcRenderer } = require('electron')

import '../styles/settings.scss'

export default function AppSettings () {
  const { state, dispatch } = useContext(Context)

  useNotification()

  function switchNotification () {
    dispatch({ type: 'SWITCH_NOTIFICATION', value: !state.openNotification })
  }

  function switchOpenAtLogin () {
    dispatch({ type: 'SWITCH_OPEN_AT_LOGIN', value: !state.openAtLogin })
  }

  function switchNoticeFreq (value) {
    dispatch({ type: 'SWITCH_NOTICE_FREQ', value })
  }

  function restoreDefSettings () {
    dispatch({ type: 'RESTORE_DEF_SETTINGS' })
  }

  function delAllRecords () {
    dispatch({ type: 'RESET_RECORDS' })
    ipcRenderer.send('del-all-records')
  }

  useEffect(() => {
    const links = document.querySelectorAll('a[href]')
    links.forEach(link => {
      link.addEventListener('click', e => {
        const url = link.getAttribute('href')
        e.preventDefault()
        ipcRenderer.send('open-url', url)
      })
    })
  }, [])

  return (
    <div className={`app-settings no-select ${state.showSettings ? 'app-settings-active' : ''}`}>
      <div className="notification flex-col">
        <div className="notification-header flex flex-ac flex-jb">
          <div className="title text-md">Notification</div>
          <Switcher state={state.openNotification} trigger={switchNotification} label="1" />
        </div>
        <span className="description text-xs">Enable this option to remind you when you
          have unfinished tasks.</span>
        <div className={`notification-radio-group ${state.openNotification ? 'notification-radio-group-active' : ''}`}>
          <div className="notification-radio flex flex-ac flex-jb">
            <span className="text-sm">Every 30 Minutes</span>
            <label htmlFor="30m" className={`${state.notificationFreq === 30 ? 'radio-active' : ''}`}>
              <input id="30m" className="pointer" type="radio" name="notification-time" onClick={() => switchNoticeFreq(30)} />
            </label>
          </div>
          <div className="notification-radio flex flex-ac flex-jb">
            <span className="text-sm">Every Hours</span>
            <label htmlFor="30m" className={`${state.notificationFreq === 60 ? 'radio-active' : ''}`}>
              <input id="60m" className="pointer" type="radio" name="notification-time" onClick={() => switchNoticeFreq(60)} />
            </label>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="title text-md">About</div>
        <div className="version flex flex-ac flex-jb">
          <span className="text-sm">Version</span>
          <span className="version-tag text-sm">v{version}</span>
        </div>
        <div className="contribute flex flex-ac flex-jb">
          <span className="text-sm">Contribute</span>
          <a className="github pointer text-sm" href="https://github.com/Longgererer/Delay-Task">Github</a>
        </div>
      </div>
      <div className="other">
        <div className="title text-md">Other</div>
        <div className="open-at-login flex flex-ac flex-jb">
          <span className="text-sm">Start With Windows</span>
          <Switcher state={state.openAtLogin} trigger={switchOpenAtLogin} label="2" />
        </div>
        <div className="def-settings flex flex-ac flex-jb">
          <span className="text-sm">Default Settings</span>
          <button className="restore text-sm pointer radius-md transition" onClick={restoreDefSettings}>Restore</button>
        </div>
        <div className="delete-all-tasks flex flex-ac flex-jb">
          <span className="text-sm">Delete All Task Records</span>
          <button className="delete text-sm pointer radius-md transition" onClick={delAllRecords}>Delete</button>
        </div>
      </div>
    </div>
  )
}