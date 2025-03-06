import { useEffect, useState } from "react";
import  { useParams } from "react-router";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";




export default function Genre(){


    const [games , setGames ] = useState([]);
    const { genre } = useParams();
    const url = `https://api.rawg.io/api/games?key=9caa972e299549c4a5f0313b4991d8df&genres=${genre}&page=1`;
   

    useEffect(() => {
        const fetchGenre = async () => {
            const response = await fetch(url);
            const json = await response.json();
            
            setGames(json.results);

        }
        fetchGenre();
    },[])



    return(

        <div className={styles.main}>
            <Sidebar/>
            
            <div>
                <div className={styles.heading}>
                    <h1>{genre} Games</h1>
                    <p>Based on player counts and release date</p>
                       <input
                         type="search"
                         name="search"
                         placeholder="Search"
                         aria-label="Search"
                       />

                </div>

            <div>
                <div className={styles.game_wrapper}>
                {games.map((game)=>(
                    
                    <GameCard key={game.id} game={game}/>

                   

                ))}

            </div>

             


                </div>
            </div>
        </div>
    )
}