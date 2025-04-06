import React from 'react';
import './leaderboard.css';

const Leaderboard = ({ data }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <table>
                <tbody>
                    <tr>
                        <th style={{ color: 'white',  textAlign: 'left' }}>Rank</th>
                        {data.map((_, index) => (
                            <td key={`rank-${index}`}>{index + 1}</td>
                        ))}
                    </tr>
                    <tr>
                        <th style={{ color: 'white', textAlign: 'left' }}>Name</th>
                        {data.map((player, index) => (
                            <td key={`name-${index}`}>{player.name}</td>
                        ))}
                    </tr>
                    <tr>
                        <th style={{ color: 'white', textAlign: 'left' }}>Score</th>
                        {data.map((player, index) => (
                            <td key={`score-${index}`}>{player.score}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;