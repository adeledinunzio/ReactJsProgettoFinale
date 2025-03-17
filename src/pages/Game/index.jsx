import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner"; 
import styles from "./Game.module.css";
import Chat from "./components/Chat";


export default function Game() {
    const { session } = useContext(SessionContext);
    const { id } = useParams();
    const [game, setGame] = useState({});
    const [favorite, setFavorite] = useState(false);

    // aggiunge ai preferiti
    const addFav = async (game) => {
        if (!session) {
            toast.error("You must be logged in!");
            return;
        }

        const { error } = await supabase
            .from("favorites")
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
            }]);

        if (error) {
            console.error("Error in adding to favorites:", error);
            toast.error("Error in adding to favorites");
        } else {
            toast.success("Game added to favorites!");
            readFav();
        }
    };

    // rimuove dai preferiti
    const deleteFav = async (game) => {
        if (!session) {
            toast.error("You must be logged in!");
            return;
        }

        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("profile_id", session.user.id)
            .eq("game_id", game.id);

        if (error) {
            console.error("Error in removing from favorites:", error);
            toast.error("Error in removing from favorites");
        } else {
            toast.success("Game removed from favorites!");
            readFav();
        }
    };

    // legge i preferiti
    const readFav = async () => {
        if (!session) return; // Se non c'è sessione, non fare nulla

        const { data, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("profile_id", session.user.id);

        if (error) {
            console.error("Error in checking favorites:", error);
        } else {
            setFavorite(data.some(fav => fav.game_id === game.id)); // Verifica se il gioco è nei preferiti
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=9caa972e299549c4a5f0313b4991d8df`);
            const json = await response.json();
            setGame(json);
        };
        fetchData();
    }, [id]);

    // Effettua la lettura dei preferiti solo se la sessione è presente e il gioco è stato caricato
    useEffect(() => {
        if (session && game.id) {
            readFav();
        }
    }, [session, game.id]); // Dipendenze aggiornate: sessione e id del gioco

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <img src={game.background_image} alt={game.name} className={styles.image} />
                <h1>{game.name}</h1>
                <p>{game.description_raw}</p>
            </div>

            <div className={styles.rightColumn}>
                <p><strong>Genres:</strong> <small>{game.genres?.map(genre => genre.name).join(", ")}</small></p>
                <p><strong>Rating:</strong> <small>{game.rating}</small></p>
                <p><strong>Platforms:</strong> <small>{game.platforms?.map(p => p.platform.name).join(", ")}</small></p>
                <p><strong>Release Date:</strong> <small>{game.released}</small></p>

                {session && (
                    <>
                        {favorite ? (
                            <button className={styles.button} onClick={() => deleteFav(game)}>Remove from Favorites</button>
                        ) : (
                            <button className={styles.button} onClick={() => addFav(game)}>Add to Favorites</button>
                        )}
                    </>
                )}

                {session && (
                    <Chat game={game} session={session}/>
                    
                )}
            </div>
            

            <Toaster position="bottom-center" />
            
            
           
        </div>
    );
}
