import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";


const platformSlugToId = {
    "pc": 4,
    "playstation5": 187,
    "xbox-series-x": 186,
    "nintendo-switch": 7,
    "playstation4": 18,
    "xbox-one": 1,
    "iOS" : 3,
    "Android" : 21,
    "macOS": 5,
    "Linux": 6,
    "Xbox 360": 14,
    "PlayStation 3": 16,
    "playstation2" : 15,
    "playstation1" : 27,
    "ps-vita": 19,
    "psp":17,
    "wii-u":10,
    "wii": 11,
    "gamecube":105,
    "nintendo64":83,
    "game-boy-advance":24,
    "game-boy-color":43,
    "game-boy": 26,
    "snes": 79,
    "nes":49,
    "macintosh":55,
    "apple-ii":41,
    "atari-7800":46,
    "atari-5200":28,
    "atari-2600":31,
    "atari-flashback":23,
    "atari-8-bit":22,
    "atari-st":25,
    "sega-master-system":34,
    "sega-genesis":33,
    "sega-cd":35,
    "sega-32x":36,
    "sega-saturn":37,
    "sega-dreamcast":38,
    "3do":111,
    "jaguar":112,
    "game-gear":77,
    "neo-geo":12   
};

const Platform = () => {
    const [games, setGames] = useState([]);
    const { platform } = useParams();

    useEffect(() => {
        const fetchPlatform = async () => {
            const platformId = platformSlugToId[platform];

            if (!platformId) {
                console.error(`Piattaforma non trovata: ${platform}`);
                setGames([]); 
                return;
            }

            const response = await fetch(`https://api.rawg.io/api/games?key=9caa972e299549c4a5f0313b4991d8df&platforms=${platformId}&page=1`);
            const json = await response.json();
            setGames(json.results);
        };

        fetchPlatform();
    }, [platform]);

    return (
        <div className={styles.main}>
            <Sidebar/>
            <div>
                <div className={styles.heading}>
                    <h1>Games for {platform}</h1>
                    
                 
                </div>

                <div className={styles.game_wrapper}>
                    {games.map((game) => (
                        <GameCard key={game.id} game={game}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Platform;
