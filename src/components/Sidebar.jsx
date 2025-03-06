import { useEffect, useState } from "react";
import styles from "../pages/Home/Home.module.css";
import { Link } from "react-router";

const genresUrl ="https://api.rawg.io/api/genres?key=9caa972e299549c4a5f0313b4991d8df";
const platformsUrl = "https://api.rawg.io/api/platforms?key=9caa972e299549c4a5f0313b4991d8df";



export default function Sidebar(){
    const [genres, setGenres] = useState ([]);
    const [platforms , setPlatforms] = useState ([]);

      useEffect (() => {
        const fetchGenres = async () => {
            const response = await fetch(genresUrl);
            const json = await response.json();
            setGenres(json.results);
        }
        fetchGenres();

      },[])

      useEffect(() => {
        const fetchPlatforms = async () => {
            const response = await fetch(platformsUrl);
            const json = await response.json();
            setPlatforms(json.results);
        };
        fetchPlatforms();
    }, []);

    return(
         <div className={styles.sidebar}>
                    
                        <details className="dropdown">
                            <summary>Genres</summary>
                               <ul>
                                 {genres.map((genre) =>(
                                    <li key={genre.id}><Link to={`/games/${genre.slug}`}>{genre.name}</Link></li>
                                 ))}
                               </ul>
                       </details>

                       <details className="dropdown">
                            <summary>Platforms</summary>
                               <ul>
                                  {platforms.map((platform) => (
                                    <li key={platform.id}>
                                         <Link to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                                    </li>
                                   ))}
                               </ul>
                       </details>

                       

                   
        
        
        
             
        
                    </div>
    )
}