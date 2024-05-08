import React from 'react';
import './App.css'; // Se necessário
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import Page1 from './telas/Page1';
import Page2 from './telas/Page2';
import Page3 from './telas/Page3';
import logo from './assets/logo.jpg'; // Importe a imagem da logo

const firebaseConfig = {
  // Configuração do Firebase
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const playersCollection = collection(db, 'players');

function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} alt="Logo" /> {/* Use a imagem da logo aqui */}
        <h1>Tabela de Pontos</h1>
        <div className="buttons-container">
          <Link to="/page1"><button>Black Shields</button></Link>
          <Link to="/page2"><button>UD Five</button></Link>
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
