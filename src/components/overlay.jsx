import React, { useContext } from 'react'
import { Context } from '../context/content'

import '../styles/overlay.scss'

export default function Overlay () {
  const { state, dispatch } = useContext(Context)

  function clearState () {
    dispatch({ type: 'DISPLAY_DRAWER', value: '' })
  }

  return (
    <div className={`${state.displayDrawer ? 'overlay' : ''}`} onClick={() => clearState()}></div >
  )
}