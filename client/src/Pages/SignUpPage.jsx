
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../components/ui/use-toast';
import AuthLayout from '../components/AuthLayout';
import { UserPlus, Mail, Lock, Briefcase, Phone, Home, MapPin, CalendarDays, Building } from 'lucide-react';
import '../index.css';
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zipCode: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
    if (!formData.age) newErrors.age = 'Age is required.';
    else if (isNaN(formData.age) || +formData.age <= 0) newErrors.age = 'Age must be a valid number.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  
  e.preventDefault();
  if (validateForm()) {
    try {
      const res = await axios.post("http://localhost:5000/users/addUser", formData);
      if (res.data) {
         toast({
          title: "Account Created!",
          description: "You've successfully signed up. Please log in.",
        });
        navigate('/login');
      }
    } catch (error) {
      // Show error from backend if available

       toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "An account with this email already exists.",
        });
      console.log(error);
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (        
    <AuthLayout title="Create Your Account" description="Join us and start your journey today!" >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter your first name', icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
            { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter your last name', icon: <Briefcase className="h-4 w-4 text-muted-foreground" /> },
            { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', icon: <Phone className="h-4 w-4 text-muted-foreground" /> },
            { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age', icon: <CalendarDays className="h-4 w-4 text-muted-foreground" /> },
          ].map((field, index) => (
            <motion.div 
              key={field.name}
              variants={inputFieldVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor={field.name} className="flex items-center">
                {field.icon} <span className="ml-2 text-2xl">{field.label} <span className="text-red-500">*</span></span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? 'text-2xl border-red-500  py-6 px-5' : 'text-2xl py-6 px-5'}
              />
              {errors[field.name] && <p className="text-xs text-red-500">{errors[field.name]}</p>}
            </motion.div>
          ))}
        </div>

        {[
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'name@example.com', icon: <Mail className="h-4 w-4 text-muted-foreground" /> },
          { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', icon: <Lock className="h-4 w-4 text-muted-foreground" /> },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••', icon: <Lock className="h-4 w-4 text-muted-foreground" /> },
          { name: 'address', label: 'Street Address', type: 'text', placeholder: 'Enter your street address', icon: <Home className="h-4 w-4 text-muted-foreground" /> },
        ].map((field, index) => (
          <motion.div 
            key={field.name}
            variants={inputFieldVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: (index + 4) * 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor={field.name} className="flex items-center">
              {field.icon} <span className="ml-2 text-2xl">{field.label} <span className="text-red-500">*</span></span>
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className={errors[field.name] ? 'text-2xl border-red-500  py-6 px-5' : 'text-2xl py-6 px-5'}
            />
            {errors[field.name] && <p className="text-xs text-red-500">{errors[field.name]}</p>}
          </motion.div>
        ))}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city', icon: <Building className="h-4 w-4 text-muted-foreground" /> },
            { name: 'zipCode', label: 'Zip Code', type: 'text', placeholder: 'Enter your zip code', icon: <MapPin className="h-4 w-4 text-muted-foreground" /> },
          ].map((field, index) => (
             <motion.div 
              key={field.name}
              variants={inputFieldVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: (index + 8) * 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor={field.name} className="flex items-center">
                {field.icon} <span className="ml-2 text-2xl">{field.label} <span className="text-red-500">*</span></span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? 'text-2xl border-red-500  py-6 px-5' : 'text-2xl py-6 px-5'}
              />
              {errors[field.name] && <p className="text-xs text-red-500">{errors[field.name]}</p>}
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={inputFieldVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="flex items-center space-x-2"
        >
          <Checkbox
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked }))}
          />
          <Label htmlFor="newsletter" className="text-xl font-normal text-muted-foreground">
            Please send me latest news and updates
          </Label>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Button type="submit" className="w-full bg-gradient-to-r hover:opacity-90 transition-opacity duration-300 text-2xl py-6 btnSubmit">
            <UserPlus className="mr-2 h-8 w-8 " /> Sign Up
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-2xl text-muted-foreground"
        >
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-accent transition-colors">
            Log In
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
    
  );
};

export default SignUpPage;
  