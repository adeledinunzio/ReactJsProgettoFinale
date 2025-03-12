import style from './Header.module.css';
import logo from '../assets/logo.png'; 
import { Link, useNavigate } from 'react-router'; 
import { useContext, useEffect, useState } from 'react';
import supabase from "../supabase/client";
import { toast, Toaster } from 'sonner';
import SessionContext from '../context/SessionContext';


export default function Header() {
    const [userLogged, setUserLogged] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate(); 
    const { session , user } = useContext(SessionContext);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserLogged(!!user);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUserLogged(!!session?.user);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success("logged out!");
        setUserLogged(false);
        navigate("/login"); 
    };

    return (
        <>
        <nav>
            <ul>
                <Link to="/">
                    <li><img src={logo} alt="ReactGame Logo" className={style.logo} /></li>
                </Link>
            </ul>
           
            <ul>
                {userLogged ? (  
                    <li className={style.dropdown}>
                    
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                           {user?.user_metadata?.username || "Account"}
                             </button>


                        {showDropdown && (
                            <div className={style.dropdownMenu}>
                                <Link to="/account"className={StyleSheet.dropdownItem}>Profile</Link>
                                <button onClick={signOut}>LogOut</button>
                            </div>
                        )}
                    </li>
                ) : (  
                    <>
                        <Link to="/login">
                            <li className={style.link}>Login</li>
                        </Link>
                        <Link to="/register">
                            <li className={style.link}>Register</li>
                        </Link>
                    </>
                )}
            </ul>
        </nav>
        
        <Toaster position="bottom-center"/>
        </>
    );
}
