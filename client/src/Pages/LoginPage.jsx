
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BgShape from "../images/hero/hero-bg.png";
import axios from 'axios'
import { API_URL } from '../api';

import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import AuthLayout from '../components/AuthLayout';
import { LogIn, Mail, Lock } from 'lucide-react';
import '../index.css';
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
 const {
  pickUp2,
  dropOff2,
  pickTime2,
  dropTime2,
  carType2,
  carImg2,
  showPopup2,
} = location.state || {};
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
    const res = await axios.post(`${API_URL}/users/login`, formData);
    const user = res.data;
    if (res.data) {
      
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${user.data.firstName}!`,
      });
    }
    localStorage.setItem("CarRentalCurrentUser", JSON.stringify(user.data));
   if (showPopup2) {
    navigate('/', {
      state: {
        pickUp2,
        dropOff2,
        pickTime2,
        dropTime2,
        carType2,
        carImg2,
        showPopup2: true,
      },
    });
  } else {
    navigate('/');
  }

  } catch (err) {
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: err.response?.data || "Invalid email or password.",
    });
  }
    } else {
       toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors.",
      });
    }
  };

  const inputFieldVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    
    <div className='login'>

      <img className="bg-shape" src={BgShape} alt="bg-shape" />
    
    <AuthLayout title="Welcome Back!" description="Log in to continue your journey.">
      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div 
          variants={inputFieldVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="space-y-2"
          >
          <Label htmlFor="email" className="flex items-center text-2xl">
            <Mail className="mr-2 h-5 w-5 text-muted-foreground" /> Email Address <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`text-x-l py-6 px-4 ${errors.email ? 'border-red-500' : ''}`}
            />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </motion.div>

        <motion.div 
          variants={inputFieldVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="space-y-2"
          >
          <Label htmlFor="password" className="flex items-center text-2xl">
            <Lock className="mr-2 h-5 w-5 text-muted-foreground" /> Password <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`text-2xl py-6 px-4 ${errors.password ? 'border-red-500' : ''}`}
            />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          >
          <Button type="submit" className="w-full bg-gradient-to-r btnSubmit to-accent hover:opacity-90 transition-opacity duration-300 text-lg py-6">
            <LogIn className="mr-2 h-5 w-5" /> Log In
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xl text-muted-foreground"
          >
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:text-accent transition-colors">
            Sign Up
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
</div>
  );
};

export default LoginPage;
  