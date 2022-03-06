import React, {useState, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Aboutpage from "./pages/Aboutpage";
import { auth } from "./utils/firebase";
import EventInfo from "./pages/EventInfo";

function App() {
  const [isLogged, setIsLogged] = useState(null)
  useEffect(() => {
    // Authenticate the user and only user who has signed in can access dashboard
    const unSub = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
    })
    return unSub();
  }, []);
  return (
    // Main router that allows routes to connect to the app.
    <BrowserRouter>
      <div className="App">
        {/* Only one route to show up at a time */}
        <Routes>
          <Route path="https://eventprism.netlify.app/" element={<>
            {!isLogged && <Homepage />}
            {isLogged && <Navigate to={'https://eventprism.netlify.app/dashboard' || 'https://eventprism.netlify.app/aboutpage'}/>}
            </>}/>
          <Route path="https://eventprism.netlify.app/login" element={<>
            {isLogged && <Navigate to='https://eventprism.netlify.app/dashboard'/>}
            {!isLogged && <Login />}
            </>} />
          <Route path="https://eventprism.netlify.app/register" element={<>
            {!isLogged && <Register />}
            {isLogged && <Navigate to='https://eventprism.netlify.app/dashboard'/>}
            </>} />
          <Route path="https://eventprism.netlify.app/dashboard" element={<>
            {isLogged && <Dashboard setIsLogged={setIsLogged} isLogged={isLogged}/> || isLogged == false && <Navigate to='https://eventprism.netlify.app/login'/>}
            </>} />
          <Route path="https://eventprism.netlify.app/aboutpage" element={<>
            {isLogged && <Aboutpage setIsLogged={setIsLogged} isLogged={isLogged}/> || isLogged == false && <Navigate to='https://eventprism.netlify.app/login'/>}
            </>} />
          <Route path="https://eventprism.netlify.app/eventinfo/:id" element={<>
            {isLogged && <EventInfo/> || isLogged == false && <Navigate to='/login'/>}
            </>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
