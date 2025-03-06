import { useState , useEffect } from "react";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

    //const api_key = "9caa972e299549c4a5f0313b4991d8df";
    const url ="https://api.rawg.io/api/games?key=9caa972e299549c4a5f0313b4991d8df&dates=2024-01-01,2025-01-01&page=1"


export default function Home(){

    const[games, setGames] = useState([]);

  

    
    useEffect (()=> {

        const fetchData = async() => {
            const response = await fetch(url);
            const json = await response.json();
            setGames(json.results);
        }
        fetchData();
        
    }, []);
    
    return(

        
        <div className={styles.main}>

           <Sidebar/>

            <div>
                <div className={styles.heading}>
                    <h1>New and trending</h1>
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