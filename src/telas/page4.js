import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Inicialize o Firebase com suas credenciais
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMÍNIO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const snapshot = await firestore.collection('sua-colecao').get();
        const documentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocuments(documentsData);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleSort = () => {
    const shuffledDocuments = [...documents].sort(() => Math.random() - 0.5);
    const newKeys = [];
    for (let i = 0; i < shuffledDocuments.length; i += 2) {
      newKeys.push({
        key1: shuffledDocuments[i],
        key2: shuffledDocuments[i + 1],
      });
    }
    setKeys(newKeys);
  };

  return (
    <div>
      <h1>Sorteio de Chaves de Jogos</h1>
      <button onClick={handleSort}>Sortear Chaves</button>
      <ul>
        {keys.map((keyPair, index) => (
          <li key={index}>
            Chave {index + 1}: {keyPair.key1} vs {keyPair.key2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
