import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context/content'

import '../styles/taskForm.scss'

export default function TaskForm () {
  const { state, dispatch } = useContext(Context)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [formType, setFormType] = useState('add')

  function titleChanged ({ target: { value } }) {
    setTitle(value)
  }

  function descriptionChanged ({ target: { value } }) {
    setDescription(value)
  }

  function clearForm () {
    setTitle('')
    setDescription('')
  }

  function close () {
    dispatch({ type: 'DISPLAY_DRAWER', value: '' })
    clearForm()
  }

  function handleSaveClick () {
    if (formType === 'add') {
      dispatch({ type: 'ADD_NEW_TASK', value: { title, description } })
    } else if (formType === 'edit') {
      dispatch({ type: 'UPDATE_TASK_CONTENT', value: { title, description } })
      setFormType('add')
    }
    close()
  }

  useEffect(() => {
    const task = state.editingTask
    if (state.editingTask !== null) {
      setTitle(task.title)
      setDescription(task.description)
      setFormType('edit')
    }
  }, [state.editingTask])

  return (
    <div className={`task-form transition ${state.displayDrawer === 'form' ? 'task-form-active' : ''}`}>
      <input type="text" className="task-title-input text-md radius-md" placeholder="Title" value={title} onChange={titleChanged} />
      <textarea rows="5" spellCheck className="task-description text-sm radius-md" placeholder="Descriptions..." value={description} onChange={descriptionChanged}></textarea>
      <div className="btn-grp flex flex-jb">
        <button className="cancel-btn pointer text-sm transition" onClick={close}>Cancel</button>
        <button className="save-btn pointer text-sm transition" disabled={title.length === 0} onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  )
}