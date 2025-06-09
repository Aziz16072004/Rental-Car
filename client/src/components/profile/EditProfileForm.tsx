import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import Button from '../ui/profileButton.tsx';
import { Save } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../../components/ui/use-toast';

interface EditProfileFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
    const { toast } = useToast();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/users/updateUser/${formData.CustomerID}`,formData)
      if (res.data) {
        localStorage.setItem('CarRentalCurrentUser', JSON.stringify(res.data.updatedUser));
        console.log(res.data);
        
        toast({
          title: "Update Successful!",
        description: "Your profile has been updated successfully.",
        status: "success",
        });

      }
    } catch (error) {
      console.log(error);
      
    }
    onSave(formData);
    
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-[1.3rem] font-medium text-gray-700">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem]  border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-[1.3rem] font-medium text-gray-700">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-[1.3rem] font-medium text-gray-700">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-[1.3rem] font-medium text-gray-700">
            Age <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-[1.3rem] font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          readOnly
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-[1.3rem] font-medium text-gray-700">
          Street Address <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.adresse}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-[1.3rem] font-medium text-gray-700">
            City <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-[1.3rem] font-medium text-gray-700">
            Zip Code <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md text-[1.3rem] border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="subscribeToNewsletter"
          name="subscribeToNewsletter"
          checked={formData.subscribeToNewsletter}
          onChange={handleChange}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="subscribeToNewsletter" className="ml-2 block text-[1.3rem] text-gray-900">
          Please send me latest news and updates
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          <Save className="w-6 h-6 mr-2" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;