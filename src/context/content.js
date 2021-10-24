import React, { useReducer, createContext } from 'react'
import { reducer, initState } from './context'

export const Context = createContext(null)

export function ContextProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    </div>
  )
}