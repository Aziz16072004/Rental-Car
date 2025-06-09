import React, { useEffect, useState } from 'react';
import Button from  '../ui/profileButton.tsx';
import { KeyRound } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../../components/ui/use-toast';
import { API_URL } from '../../api';

interface PasswordChangeFormProps {
  onSave: (passwords: {currentPassword: string; newPassword: string}) => void;
  onCancel: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({user, onSave, onCancel }) => {

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    try {
      const res = await axios.put(`${API_URL}/users/updatePassword/${user.CustomerID}`, {currentPassword: passwords.currentPassword,newPassword:passwords.newPassword ,confirmNewPassword:passwords.confirmPassword});
      console.log(res.data);
      
      if (res.data){
        toast({
          title: "Update password Successful!",
        description: "Your password has been updated successfully.",
        status: "success",
        });
        onSave({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword
    });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data || "Something went wrong.",
        status: "error",
      });
    }
    
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4 text-xl">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="currentPassword" className="block text-[1.3rem] font-medium text-gray-700 ">
          Current Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          required
          className="text-[1.3rem] mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="newPassword" className="block text-[1.3rem] font-medium text-gray-700">
          New Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          required
          className="text-[1.3rem] mt-1 block w-full   rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-[1.3rem] font-medium text-gray-700">
          Confirm New Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          required
          className="text-[1.3rem] mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          <KeyRound className="w-4 h-4 mr-2" />
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;