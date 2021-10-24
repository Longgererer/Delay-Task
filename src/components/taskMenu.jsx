import React, { useContext } from 'react'
import { Context } from '../context/content'

import '../styles/taskMenu.scss'

export default function TaskMenu ({ info }) {
  const { dispatch } = useContext(Context)

  function delTask () {
    dispatch({ type: 'DELETE_TASK', value: info.id })
  }

  function editTask () {
    dispatch({ type: 'UPDATE_EDITING_TASK', value: info })
    dispatch({ type: 'DISPLAY_DRAWER', value: 'form' })
  }

  return (
    <div className="test-menu radius-md">
      <ul className="menu-content">
        <li onClick={editTask}>Edit</li>
        <li onClick={delTask}>Delete</li>
      </ul>
    </div>
  )
}