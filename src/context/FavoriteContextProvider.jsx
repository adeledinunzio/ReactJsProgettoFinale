import { useState, useEffect, useContext } from "react";
import FavoriteContext from "./FavoriteContext";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client"; 

const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); 
  const { session } = useContext(SessionContext);

  
  useEffect(() => {
    const fetchFavorites = async () => {
      if (session && favorites.length === 0) { 
        const { data, error } = await supabase
          .from('favorites')
          .select('game_id, game_name')
          .eq('profile_id', session.user.id);
        
        if (error) {
          console.error("Errore nel recuperare i preferiti:", error);
        } else {
          setFavorites(data); 
        }
      }
    };

    fetchFavorites();
  }, [session, favorites.length]); 

  
  const addFavorite = async (game) => {
    if (!session) {
      console.log("Devi essere loggato per aggiungere ai preferiti!");
      return;
    }

    const { data, error } = await supabase
      .from('favorites')
      .insert([{
        profile_id: session.user.id,
        game_id: game.id,
        game_name: game.name,
      }]);

    if (error) {
      console.error("Errore nell'aggiungere ai preferiti:", error);
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, data[0]]);
    }
  };


  const removeFavorite = async (gameId) => {
    if (!session) {
      console.log("Devi essere loggato per rimuovere dai preferiti!");
      return;
    }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('profile_id', session.user.id)
      .eq('game_id', gameId);

    if (error) {
      console.error("Errore nella rimozione dai preferiti:", error);
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.game_id !== gameId)
      );
    }
  };

  
  const isFavorite = (gameId) => {
    return favorites.some((fav) => fav.game_id === gameId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
