import logo from './logo.svg';
import './App.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Views/Home';
import StudyNow from './Views/StudyNow';
import OSFlash from './Views/OSflash';
import OSmod1 from './Views/OSmod1';
import Nav from './Components/nav';
import FlashCardDisplay from './Views/FlashCardDisplay';

function App() {
  return (
    <div className="App">
        {/*define routes*/}
        <Router>
            <Nav /> {/*places nav bar*/}
            <Routes>
                <Route path="/" exact={true} element={<Home/>} /> {/* This works because our root path (just the "/") is what appears when the page is opened*/}
                <Route path="/study-now" exact={true} element={<StudyNow/>} />
                <Route path="/OS-flashcards" exact={true} element={<OSFlash/>} />
                <Route path="/module1" exact={true} element={<OSmod1/>} />
                <Route path="/FlashcardDisplay" exact={true} element={<FlashCardDisplay/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
