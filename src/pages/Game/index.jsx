import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Game(){

    const { id } = useParams();
    const [game, setGame] = useState({});
    console.log(id);

    useEffect(() =>{
        const fetchData = async () => {
   
   
            const response = await fetch (`https://api.rawg.io/api/games/${id}?key=9caa972e299549c4a5f0313b4991d8df`);
            const json = await response.json();
            setGame(json);
          
        };
        fetchData();

    },[]);

    return(
        <div className="container">
            <img src={game.background_image} alt="" />
            <h1>{game.name}</h1>
            <p>{game.description_raw}</p>
            <p>Genres: {game.genres?.map(genre => genre.name).join(", ")}</p>
            <p>{game.rating}</p>
            <p>Platforms: {game.platforms?.map(p => p.platform.name).join(", ")}</p>
            <p>{game.released}</p>
        </div>
    )
}