import './App.css';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
