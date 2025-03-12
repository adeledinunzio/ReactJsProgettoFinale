import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";

function SessionContextProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user || null);
        };

        fetchSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                    setUser(null);
                } else if (session) {
                    setSession(session);
                    setUser(session.user);
                }
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={{ session, user }}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;
