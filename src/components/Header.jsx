import style from "./Header.module.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/client";
import { toast, Toaster } from "sonner";
import SessionContext from "../context/SessionContext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);
    const [userLogged, setUserLogged] = useState(false);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [username, setUsername] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

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

    

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (session) {
                const { user } = session;

                const { data, error } = await supabase
                    .from("profiles")
                    .select("username, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.warn("Errore nel recupero dell'avatar:", error);
                } else if (data) {
                    setUsername(data.username);
                    setAvatarUrl(data.avatar_url);
                }
            }
        };

        fetchUserProfile();
    }, [session]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success("Logged out!");
        setUserLogged(false);
        navigate("/login");
    };

    return (
        <>
            <nav>
                <ul>
                    <Link to="/">
                        <li>
                            <img src={logo} alt="ReactGame Logo" className={style.logo} />
                        </li>
                    </Link>
                </ul>

                <ul>
                    {userLogged ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt="User Avatar"
                                        src={avatar_url 
                                            ? `https://idtaypunngilnmigargo.supabase.co/storage/v1/object/public/avatars/${avatar_url}` 
                                            : "/default-avatar.png"} 
                                    />
                                </IconButton>
                            </Tooltip>
                            <Typography
                                sx={{ textAlign: "center", p: 0, cursor: "pointer" }}
                                onClick={handleOpenUserMenu}
                            >
                                {username || "Account"}
                            </Typography>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: "center" }}>
                                        <Link to="/account" style={{ textDecoration: "none" }}>
                                            Account
                                        </Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        sx={{ textAlign: "center", color: "black" }}
                                        onClick={signOut}
                                    >
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
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

            <Toaster position="bottom-center" />
        </>
    );
}
