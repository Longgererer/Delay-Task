import { getToday } from '../utils/date'
import store from '../utils/store'

export const initState = {
  curDate: getToday(), // 当前显示的日期，默认当天日期
  showAddDrawer: false,
  showCalDrawer: false,
  displayDrawer: '',
  editingTask: null,
  curTaskList: getTaskByDate(getToday()),
  showSettings: false,
  openNotification: !!store.get('openNotification'),
  notificationFreq: store.get('notificationFreq') || 60,
  openAtLogin: !!store.get('openAtLogin')
}

function getTaskByDate (date) {
  const { day, month, year } = date
  return store.get(`taskList.${year}-${month}-${day}`) || []
}

function setTaskByDate (date, list) {
  const { day, month, year } = date
  store.set(`taskList.${year}-${month}-${day}`, list)
}

export function reducer (state, action) {
  switch (action.type) {
    case 'SWITCH_DATE':
      const { curDate, curTaskList } = state
      // 每次更新日期，将当前任务列表存储
      setTaskByDate(curDate, curTaskList)
      return {
        ...state,
        curDate: action.value,
        curTaskList: getTaskByDate(action.value)
      }
    case 'DISPLAY_DRAWER':
      return { ...state, displayDrawer: action.value }
    case 'UPDATE_TASK': {
      const newTaskList = state.curTaskList.map(item => {
        if (item.id === action.value.id) {
          return Object.assign({}, item, {
            state: action.value.state
          })
        }
        return item
      })
      setTaskByDate(state.curDate, newTaskList)
      return { ...state, curTaskList: newTaskList }
    }
    case 'UPDATE_TASK_CONTENT': {
      const editingTask = state.editingTask
      const newTaskList = state.curTaskList.map(item => {
        if (item.id === editingTask.id) {
          return Object.assign({}, editingTask, action.value)
        }
        return item
      })
      setTaskByDate(state.curDate, newTaskList)
      return { ...state, curTaskList: newTaskList, editingTask: null }
    }
    case 'ADD_NEW_TASK': {
      const newTaskList = [
        {
          ...action.value,
          state: 'ToDo',
          id: Date.now()
        },
        ...state.curTaskList,
      ]
      setTaskByDate(state.curDate, newTaskList)
      return { ...state, curTaskList: newTaskList }
    }
    case 'DELETE_TASK': {
      const newTaskList = state.curTaskList.filter((item) => item.id !== action.value)
      setTaskByDate(state.curDate, newTaskList)
      return { ...state, curTaskList: newTaskList }
    }
    case 'UPDATE_LIST_ORDER': {
      setTaskByDate(state.curDate, action.value)
      return { ...state, curTaskList: action.value }
    }
    case 'UPDATE_EDITING_TASK': {
      setTaskByDate(state.curDate, action.value)
      return { ...state, editingTask: action.value }
    }
    case 'SAVE_CURDAY_DATA': {
      const { curDate, curTaskList } = state
      setTaskByDate(curDate, curTaskList)
      return state
    }
    case 'SHOW_SETTINGS': {
      return { ...state, showSettings: action.value }
    }
    case 'SWITCH_NOTIFICATION': {
      store.set('openNotification', action.value)
      return { ...state, openNotification: action.value }
    }
    case 'SWITCH_NOTICE_FREQ': {
      store.set('notificationFreq', action.value)
      return { ...state, notificationFreq: action.value }
    }
    case 'SWITCH_OPEN_AT_LOGIN': {
      store.set('openAtLogin', action.value)
      return { ...state, openAtLogin: action.value }
    }
    case 'RESTORE_DEF_SETTINGS': {
      return {
        ...state,
        openNotification: false,
        notificationFreq: 60,
        openAtLogin: false
      }
    }
    case 'RESET_RECORDS': {
      return {
        ...state,
        curTaskList: []
      }
    }
    default:
      throw new Error(`type ${action.type} does not exists in reducer!`)
  }
}