import logo from './logo.svg';
import './App.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Home from './Views/home/Home';
import StudyNow from './Views/studynow/StudyNow';
import OSFlash from './Views/flash/OSflash';
import OSmod1 from './Views/mod1/OSmod1';
import Account from './Views/accounts/Account';
import Login from './Views/login/Login'
import Nav from './Components/navbar/nav';
import Footer from './Components/footer/footer'
import FlashCardDisplay from './Views/carddisplay/FlashCardDisplay';
import FlashEnd from './Views/flashEnd/flashEnd';
import ViewSet from './Views/viewSet/viewSet';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
        {/*define routes*/}
        <Router>
            <Nav isAuthenticated={isAuthenticated}/> {/*places nav bar*/}
              <Routes>
                  <Route path="/" exact={true} element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                  <Route path="/home" exact={true} element={<Home />} /> {/* This works because our root path (just the "/") is what appears when the page is opened*/}
                  <Route path="/courses" exact={true} element={<StudyNow />} />
                  <Route path="/OS-flashcards" exact={true} element={<OSFlash />} />
                  <Route path="/module/*" element={<OSmod1 />} />
                  <Route path="/account-page" exact={true} element={<Account />} />
                  <Route path="/FlashCardDisplay" exact={true} element={<FlashCardDisplay />} />
                  <Route path="/flashEnd" exact={true} element={<FlashEnd />} />
                  <Route path="/viewSet/:id" exact={true} element={<ViewSet />} />
                  <Route path="*" element={<div>Page Not Found</div>} />

            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
