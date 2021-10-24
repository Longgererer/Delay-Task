import { useContext, useEffect, useState } from 'react'
import { Context } from './content'


export default function useNotification () {
  const { state } = useContext(Context)
  const [timer, setTimer] = useState(null)
  const [timeStart, setTimeStart] = useState(Date.now())
  const [isInit, setIsInit] = useState(true)

  useEffect(() => {
    // 每次改变提醒时间，重新开始计时
    if (isInit) {
      setIsInit(false)
    } else {
      setTimeStart(Date.now())
      if (state.openNotification) {
        setTimer(setInterval(() => {
          if (timeStart + state.notificationFreq * 60 * 1000 <= Date.now()) {
            const unfinishedLen = state.curTaskList.filter((item) => {
              return item.state !== 'Accomplish'
            }).length
            if (unfinishedLen > 0) {
              new Notification("Delay Task Notice", {
                body: `Step it up. You have ${unfinishedLen} more missions to finish!`
              })
            }
            clearInterval(timer)
            setTimer(null)
            setTimeStart(Date.now())
          }
        }, 1000))
      }
    }
  }, [state.notificationFreq, state.openNotification])
}