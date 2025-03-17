import { useEffect, useState, useRef } from "react";
import styles from "../Game.module.css";
import supabase from "../../../supabase/client";

export default function RealtimeChat({ game }) {
    const [messages, setMessages] = useState([]); 
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    function scrollSmoothToBottom() {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = async () => {
        if (!game?.id) return;

        setLoadingInitial(true);

        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("game_id", game.id);

        if (error) {
            setError(error.message);
        } else {
            setMessages(data);
        }

        setLoadingInitial(false);
    };

    useEffect(() => {
        if (!game?.id) return; 

        getInitialMessages();

        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages",
                },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [game?.id]); 

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div className={styles.messages} ref={messageRef}>
            {loadingInitial && <progress></progress>}
            {error && <article>{error}</article>} 
            {messages.map((message) => (
                <article key={message.id} className={styles.chat_message}>
                    <p className={styles.chat_username}>{message.profile_username}</p>
                    <small className={styles.message}>{message.content}</small>
                    <p className={styles.timestamps}>{message.created_at}</p>
                </article>
            ))}
        </div>
    );
}
