import './App.css';
import About from './components/about';
import Home from './components/home';
import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
     <Router>
    <NoteState>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
    </NoteState>
    </Router>
    </div>

  );
}

export default App;
