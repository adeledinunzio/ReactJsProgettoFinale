import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import GameCard from "../../components/GameCard";
import styles from "./Search.module.css";
import SearchGame from "../Home/components/SearchGame";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) return; 

        const fetchGames = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=9caa972e299549c4a5f0313b4991d8df&search=${query}`);
                if (!response.ok) throw new Error("Errore nel recupero dei dati");
                const result = await response.json();

                const filteredGames =result.results.filter(game => game.name.toLowerCase().includes(query.toLowerCase())
            );
                setGames(filteredGames);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [query]);

    return (
        <div className={styles.container}>
            <SearchGame/>
            <h1>Risultati per: {query}</h1>

            {loading && <p>Caricamento...</p>}
            {error && <p className={styles.error}>Errore: {error}</p>}

            <div className={styles.games_wrapper}>
                {games.length > 0 ? (
                    games.map((game) => <GameCard key={game.id} game={game} />)
                ) : (
                    !loading && <p>Nessun gioco trovato</p>
                )}
            </div>
        </div>
    );
}
