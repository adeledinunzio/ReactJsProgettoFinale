import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

export default function Home() {
    const [page, setPage] = useState(1);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true); 
    const loadMoreRef = useRef(null); 

    const url = `https://api.rawg.io/api/games?key=9caa972e299549c4a5f0313b4991d8df&dates=2024-01-01,2025-01-01&page=${page}`;

    useEffect(() => {
        const fetchData = async () => {
            if (!hasMore) return; 
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
                const json = await response.json();
                
                setGames((prevGames) => [...prevGames, ...(json.results || [])]); 
                setHasMore(json.next !== null); 
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [page]); 

  
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    return (
        <div className={styles.main}>
            <Sidebar />
            <div>
                <div className={styles.heading}>
                    <h1>New and Trending</h1>
                    <p>Based on player counts and release date</p>
                    <input type="search" name="search" placeholder="Search" aria-label="Search" />
                </div>

                {error && <p className={styles.error}>Errore: {error}</p>}

                <div className={styles.game_wrapper}>
                    {games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        !loading && <p>Nessun gioco trovato</p>
                    )}
                </div>

                
                <div ref={loadMoreRef} style={{ height: "20px" }}></div>

                {loading && <p>Caricamento...</p>}
            </div>
        </div>
    );
}
