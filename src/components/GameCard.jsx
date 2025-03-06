import { useNavigate } from 'react-router';
import React from 'react';
import styles from './GameCard.module.css';
import GameImage from './GameImage'; 

const GameCard = ({ game }) => {
    const navigate = useNavigate();
    return (

        <div className={styles.gameCard} onClick={() => navigate(`/games/${game.id}/${game.name}`)}>
            
            <GameImage image={game.background_image} className={styles.gameImage} />

            <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>{game.name}</h3>
                <p className={styles.platforms}>
                    {game.platforms.map(p => p.platform.name).join(", ")}
                </p>
                <p className={styles.genres}>
                    <strong>Generi:</strong> {game.genres.map(g => g.name).join(", ")}
                </p>
                <a><small>read more..</small></a>
            </div>
        </div>
    );
}

export default GameCard;
