import "../src/dist/styles.css";
import About from "./Pages/About";
import { useLocation } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import '@fortawesome/fontawesome-free/css/all.min.css';


import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";

import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { Toaster } from './components/ui/toaster';
import ProfilePage from "./Pages/ProfilePage.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const location = useLocation();
  const hideNavbarOn = ["/signup","/login"];
  const [user, setUser] = useState(null);
    
      useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("CarRentalCurrentUser"));
        setUser(savedUser);
      }, []);
       
  const [cars, setCars] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:5000/cars/getCars")
    .then((res) => {
      setCars(res.data);
      console.log(res.data);
      
    })
    .catch((err) => {
      console.error("Failed to fetch vehicles:", err);
    });
  }, []);

  return (
    <>
      
           {!hideNavbarOn.includes(location.pathname) && <Navbar />}

      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route index path="/" element={<Home cars={cars} user={user} />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models  cars={cars} user={user} />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/profile" element={<ProfilePage />}  />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
