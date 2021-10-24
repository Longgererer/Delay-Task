import React from 'react'
import Header from './header'
import Calendar from './calendar'
import Overlay from './overlay'
import TaskForm from './taskForm'
import TasksList from './taskList'


import '../styles/main.scss'

export default function Main () {
  return (
    <div className="main">
      <Header />
      <TasksList />
      <Calendar />
      <TaskForm />
      <Overlay />
    </div>
  )
}