
import { RouterProvider } from "react-router";
import router from "./routes";
import SessionContextProvider from "./context/SessionContextProvider"; 
import FavoriteContextProvider from "./context/FavoriteContextProvider";

function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <SessionContextProvider> 
      <FavoriteContextProvider>
        <App />
      </FavoriteContextProvider>
      
    </SessionContextProvider>
  );
}

export default Root;
