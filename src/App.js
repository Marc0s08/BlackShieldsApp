import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import Page1 from './telas/Page1';
import Page2 from './telas/Page2';
import Page3 from './telas/Page3';

const firebaseConfig = {
  apiKey: "AIzaSyD6yHbRF47f9TWUM80y3FSD1ylOFEr6JXg",
  authDomain: "black-shields.firebaseapp.com",
  projectId: "black-shields",
  storageBucket: "black-shields.appspot.com",
  messagingSenderId: "36610876059",
  appId: "1:36610876059:web:5343e879320520c93a9c3e",
  measurementId: "G-WJNR5S7VND"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const playersCollection = collection(db, 'players');

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Tabela de Pontos</h1>
        <div className="buttons-container">
          <Link to="/page1"><button>Black Shields</button></Link>
          <Link to="/page2"><button>UDFive</button></Link>
          <Link to="/page3"><button>Black Shields 2</button></Link>
        </div>
      </div>
      <Routes>
        <Route path="/page1" exact element={<Page1 playersCollection={playersCollection} />} />
        <Route path="/page2" exact element={<Page2 playersCollection={collection(db, 'players2')} />} />
        <Route path="/page3" exact element={<Page3 playersCollection={collection(db, 'players3')} />} />
      </Routes>
    </Router>
  );
}

export default App;
  