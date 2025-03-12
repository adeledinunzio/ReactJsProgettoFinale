
import { Link, useNavigate } from "react-router";
import supabase from "../../supabase/client";
import styles from "./SignUp.module.css";
import {Toaster , toast } from "sonner";


export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, first_name, last_name, username } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signUp({
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
      toast.error('BAD Signing up')
      
    } else {
        toast.success('Signed Up CORRECT');
      formRegister.reset();
    
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
    
      
        <h1>Sign Up !</h1>
        <form className="signUp" onSubmit={handleSignUp}>
          <input
            type="first_name"
            name="first_name"
            placeholder="first_name"
            aria-label="first_name"
            autoComplete="first_name"
            required
            
          />
          <input
            type="last_name"
            name="last_name"
            placeholder="last_name"
            aria-label="last_name"
            autoComplete="last_name"
            required
            
          />
          <input
            type="username"
            name="username"
            placeholder="Username"
            aria-label="Username"
            autoComplete="Username"
            required
            
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="Email"
            required
            
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
            
          />
          <fieldset>
            <label htmlFor="remember">
              <input
                type="checkbox"
                role="switch"
                id="remember"
                name="remember"
              />
              Remember me
            </label>
          </fieldset>
          <button type="submit">Register now!</button>
          <p>
            Already registered?
            <Link to="/login" style={{ margin: "0px 5px" }}>
              Login
            </Link>
          </p>
        </form>
        <Toaster position="bottom-center"/>
       
      
    </div>
  );
}