import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import supabase from "../supabase/client";

export default function ProtectedRoute() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

