import { useNavigate } from "react-router";
import supabase from "../../supabase/client";
import {Toaster , toast } from "sonner";
import styles from "./SignIn.module.css";


export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, first_name, last_name, username } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username
        }
      }
    });
    if (error) {
        formRegister.reset();
      toast.error('BAD login')
      
    } else {
        toast.success('login CORRECT');
      formRegister.reset();
    
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
    
      
        <h1>Login !</h1>
        <form className="signIn" onSubmit={handleSignIn}>
         
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="Email"
            
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            
          />
          
          <button type="submit">Login now!</button>
          
        </form>
        <Toaster position="bottom-center"/>
       
      
    </div>
  );
}