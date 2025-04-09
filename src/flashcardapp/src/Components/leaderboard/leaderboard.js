import React from 'react';
import './leaderboard.css';

const Leaderboard = ({ data }) => {

    //if data does not have at least 10 entries, fill with empty objects
    const modifyData = () => {
        const modifiedData = [...data];
        while (modifiedData.length < 10) {
            modifiedData.push({ name: '', score: 0 });
        }
        return modifiedData.slice(0, 10);
    }
    const modifiedData = modifyData();
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <table>
                <tbody>
                    <tr>
                        <th style={{ color: 'white',  textAlign: 'left' }}>Rank</th>
                        {modifiedData.map((_, index) => (
                            <td key={`rank-${index}`}>{index + 1}</td>
                        ))}
                    </tr>
                    <tr>
                        <th style={{ color: 'white', textAlign: 'left' }}>Name</th>
                        {modifiedData.map((player, index) => (
                            <td key={`name-${index}`}>{player.name}</td>
                        ))}
                    </tr>
                    <tr>
                        <th style={{ color: 'white', textAlign: 'left' }}>Score</th>
                        {modifiedData.map((player, index) => (
                            <td key={`score-${index}`}>{player.score}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;