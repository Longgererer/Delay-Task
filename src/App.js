import { ContextProvider } from './context/content'
import Main from './components/main'
import AppTitle from './components/appTitle'
import Settings from './components/settings'

function App () {
  return (
    <ContextProvider>
      <AppTitle />
      <Settings />
      <Main />
    </ContextProvider>
  )
}

export default App