import style from './Header.module.css';
import logo from '../assets/logo.png'; 
import { Link } from 'react-router';
import { useEffect } from 'react';
import supabase from "../supabase/client";

export default function Header() {

    const signOut = async() => {
        await supabase.auth.signOut();
    }

    useEffect(() => {

        

        const getInfo = async () => {
            const { data } = await supabase.auth.getSession()
            console.log(data);
            const { data: { user }} = await supabase.auth.getUser()
            console.log(user);
            

        }
        getInfo();

    }, []);

    return (
        <nav>
            <ul>
                <Link to="/">
                <li><img src={logo} alt="ReactGame Logo" className={style.logo} /></li>
                </Link>
              
                
            </ul>
            <ul>
                

                <Link to="/login">
                <li className={style.link}>Login</li>
                </Link>


                <Link to="/register">
                <li className={style.link}>Register</li>
                </Link>

                <button onClick={signOut}>LogOut</button>
                
                
            </ul>
        </nav>
    );
}
