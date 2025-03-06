import style from './Header.module.css';
import logo from '../assets/logo.png'; 

export default function Header() {
    return (
        <nav>
            <ul>
                <li>
                   
                    <img src={logo} alt="ReactGame Logo" className={style.logo} />
                </li>
                
            </ul>
            <ul>
                <li><a href="#" className={style.link}>Login</a></li>
                <li><a href="#" className={style.link}>Register</a></li>
                
            </ul>
        </nav>
    );
}
