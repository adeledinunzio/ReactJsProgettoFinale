import React, { useContext, useEffect } from "react";
import { Toaster, toast } from "sonner";
import FavoriteContext from "../../../context/FavoriteContext"; 
import styles from "./Favorites.module.css";

const Favorites = () => {
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoriteContext);

  
  useEffect(() => {
    if (favorites.length === 0) {
      toast.info("You have not added games to your favorites");
    }
  }, [favorites]);

  return (
    <div className={styles.container}>
      <h2 style={{ color: "white" }}>Your Fave Games</h2>
      <div>
        {favorites.length === 0 ? (
          <p>Non hai ancora aggiunto giochi ai preferiti.</p>
        ) : (
          favorites.map((favorite) => (
            <div key={favorite.game_id}>
              <p>{favorite.game_name}</p>
              <button onClick={() => removeFavorite(favorite.game_id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Favorites;



