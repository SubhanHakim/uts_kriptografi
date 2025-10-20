import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Navbar02 } from './components/ui/shadcn-io/navbar-02';
import HomePage from './pages/homePage';
import AboutPage from './pages/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar02 logo={<h2 className="uppercase font-bold">Subhan X Shamil X Zaen</h2>} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;