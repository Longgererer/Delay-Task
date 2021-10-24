import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context/content'
import Task from './task'

import '../styles/taskList.scss'

export default function TaskList () {
  const { state, dispatch } = useContext(Context)
  const [cpyTaskList, setCpyTaskList] = useState([]) // 保存一份任务列表副本方便拖拽时动态修改
  const [draggingItem, setDraggingItem] = useState(null)
  const [tmpList, setTmpList] = useState([])

  useEffect(() => {
    setCpyTaskList([...state.curTaskList])
  }, [state.curTaskList])

  function dragStart (e, task) {
    setDraggingItem(task)
    setTmpList(cpyTaskList.filter((item) => task.id !== item.id))
    e.target.style.opacity = 0.5
  }
  function dragEnd (e) {
    e.target.style.opacity = 1
    setTmpList([])
    dispatch({ type: 'UPDATE_LIST_ORDER', value: cpyTaskList })
  }
  function dragEnter (task, index) {
    if (draggingItem.id !== task.id) {
      setCpyTaskList([
        ...tmpList.slice(0, index),
        draggingItem,
        ...tmpList.slice(index)
      ])
    }
  }

  return (
    <div className="task-list no-select">
      {
        cpyTaskList.length ? (
          <ul>
            {
              cpyTaskList.map((item, index) => {
                return (
                  <li key={item.id} draggable="true" onDragStart={(e) => dragStart(e, item)} onDragEnd={dragEnd} onDragEnter={() => dragEnter(item, index)}>
                    <Task info={item}></Task>
                  </li>
                )
              })
            }
          </ul>
        ) : (
          <div className="blank-tip flex flex-col flex-ac">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-konghezi"></use>
            </svg>
            <span className="text-sm">There is no task</span>
          </div>
        )
      }
    </div>
  )
}