import React, { useState, useContext } from 'react'
import { Context } from '../context/content'
import TaskMenu from './taskMenu'

import '../styles/task.scss'

export default function Task ({ info }) {
  const { dispatch } = useContext(Context)
  const [showMenu, setShowMenu] = useState(false)
  const [switcherFold, setSwitcherFold] = useState(true)

  const styleMap = {
    ToDo: { name: 'ToDo', class: 'to-do', icon: 'icon-to-do' },
    InProgress: { name: 'InProgress', class: 'in-progress', icon: 'icon-in-progress' },
    Accomplish: { name: 'Accomplish', class: 'accomplish', icon: 'icon-accomplish' }
  }

  function toggleMenu () {
    setShowMenu(!showMenu)
  }

  function handleSwitcher () {
    setSwitcherFold(!switcherFold)
  }

  function updateState (newState) {
    dispatch({
      type: 'UPDATE_TASK',
      value: {
        id: info.id,
        state: newState
      }
    })
  }

  const switcherOpts = []
  for (let i in styleMap) {
    if (i !== info.state) {
      switcherOpts.push(styleMap[i])
    }
  }

  return (
    <div className="task-item radius-md no-select">
      <div className={`task-content ${styleMap[info.state].class}`}>
        <div className="content-header flex flex-ai">
          <span className="content-title text-md">{info.title}</span>
          <div
            className={`menu-toggle circle transition text-center pointer ${showMenu ? 'menu-toggle-active' : ''}`}
            onClick={() => toggleMenu()}
          >
            <i className="icon iconfont icon-menu text-xl transition"></i>
            {showMenu && <TaskMenu info={info} />}
          </div>
        </div>
        <div className="content-description flex">
          <span className="text-sm">{info.description}</span>
          <div
            className={`state-switcher pointer transition flex flex-ac flex-jc ${switcherFold ? '' : 'state-switcher-active'}`}
            onClick={() => handleSwitcher()}
          >
            <i className={`icon iconfont transition ${styleMap[info.state].icon}`}></i>
            {
              !switcherFold && (
                <div className="switcher-opts flex radius-md">
                  {
                    switcherOpts.map((item, index) => {
                      return (
                        <div key={index} className="opts-item text-center" onClick={() => updateState(item.name)}>
                          <i className={`icon iconfont ${item.icon}`}></i>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
