import React, { useState, useEffect } from 'react';
import { sql } from "@vercel/postgres";

;
const Rank = () => {
  const players = [];
  
  useEffect(() => {

    async function getusers  (){
      const { users } = await sql`SELECT * FROM users`;
      console.log(users);
    }
    getusers();
  }, []);

  return (
    <div className='center' style={{flexDirection:"column",gap:"10px"}}>
  
      <h1 className="rank-heading">Rankings</h1>
    <div className="rank-container">
      <table className="rank-table">
        <thead className="fixed-header">
          <tr>
            <th>Rank</th>
            <th>name</th>
            <th>Own coins</th>
          </tr>
        </thead>
       
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className={index < 3 ? 'top-3' : ''}>
              <td >
                {index === 0 && <img src="gold-medal.png" alt="Gold Medal" />}
                {index === 1 && <img src="silver-medal.png" alt="Silver Medal" />}
                {index === 2 && <img src="bronze-medal.png" alt="Bronze Medal" />}
                {index + 1}
              </td>
              <td>{player.telegram_username}</td>
              <td>{player.own_tokens}</td>
            </tr>
          ))}
       
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Rank;
