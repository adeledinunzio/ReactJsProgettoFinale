import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router";
  import Markup from "../layout";
  import Home from "../pages/Home";
  import Genre from "../pages/Genre";
  import Game from "../pages/Game";
  import Platform from "../pages/Platform";
  import SignUp from "../pages/SignUp";
  import SignIn from "../pages/SignIn";
  import Account from "../pages/Account";
  import ProtectedRoute from "../components/ProtectedRoute";
  import Search from "../pages/Search";
  
 
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Markup />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/games/:genre" element={<Genre/>}/>
        <Route path="/games/:id/:game" element={<Game/>}/>
        <Route path="/platforms/:platform" element={<Platform />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/register" element={<SignUp/>} />
        <Route path="/login" element={<SignIn/>} />
        
        

        <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<Account />} />
            </Route>
        
        
      
      </Route>
    )
  );
  
  export default router;