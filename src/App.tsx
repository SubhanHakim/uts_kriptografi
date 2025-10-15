import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Navbar02 } from './components/ui/shadcn-io/navbar-02'
import HomePage from './pages/homePage'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar02 logo={<h2 className='uppercase font-bold'>Subhan X Shamil</h2>} />
      <HomePage/>
    </ThemeProvider>
  )
}

export default App
