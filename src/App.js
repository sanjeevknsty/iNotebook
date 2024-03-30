import './App.css';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <div className="App">
    <NoteState>
     <BrowserRouter>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </div>

  );
}

export default App;
