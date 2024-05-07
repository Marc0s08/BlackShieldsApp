import React, { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';

function Page1({ playersCollection }) {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const querySnapshot = await getDocs(playersCollection);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlayersData(data);
      } catch (error) {
        console.error("Error fetching players data: ", error);
      }
    };

    fetchPlayersData();
  }, [playersCollection]);

  return (
    <div className="App">
      <h1>Tabela de Pontos - Página 1</h1>
      <div className="tables-container">
        <table className="left-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nickname</th>
              <th>Abates</th>
              <th>Mortes</th>
              <th>Assistências</th>
              <th>Conquistas</th>
              <th>MVP</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr key={player.id}>
                <td className="logo"><img src={player.logo} alt={player.nickname} /></td>
                <td>{player.nickname}</td>
                <td>{player.kills}</td>
                <td>{player.deaths}</td>
                <td>{player.assists}</td>
                <td>{player.achievements}</td>
                <td className={player.mvp ? 'MVP' : ''}>{player.mvp ? 'Sim' : 'Não'}</td>
                <td>{calculateScore(player)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function calculateScore(player) {
  if (player.deaths === 0) {
    return (player.kills + player.assists) + player.achievements + (player.mvp ? 1 : 0); // Ou qualquer outro valor que você preferir
  } else {
    return ((player.kills + player.assists) / player.deaths) + player.achievements + (player.mvp ? 1 : 0);
  }
}

export default Page1;
