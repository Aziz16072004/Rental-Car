  import React, { useEffect, useState } from 'react';
  import ProfileHeader from '../components/profile/ProfileHeader';
  import ProfileTabs from '../components/profile/ProfileTabs';
  import EditProfileForm from '../components/profile/EditProfileForm';
  import PasswordChangeForm from '../components/profile/PasswordChangeForm';
  import RentalHistoryItem from '../components/profile/RentalHistoryItem';
  import SavedVehicles from '../components/profile/SavedVehicles';
  import Card, { CardHeader, CardContent } from '../components/ui/profileCard.tsx';
  import { User, Rental } from '../types/user';
  import { CreditCard, Lock, Settings } from 'lucide-react';
  import HeroPages from '../components/HeroPages';
  import { useLocation } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
  import { API_URL } from '../api';

import axios from 'axios';


  const mockUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: 0,
    adresse: '',
    city: '',
    zipCode: '',
    subscribeToNewsletter: true,
    createdAt: new Date('2023-01-15')
  };

  const mockRentals: Rental[] = [
    {
      id: 'r1',
      carModel: 'e36 2',
      carMake: 'BMW',
      pickUpLocation: 'Delhi',
      dropOffLocation: 'Bengaluru',
      pickUpDate: '2023-12-12',
      dropOffDate: '2023-12-15',
      totalCost: 150,
      status: 'completed'
    },
    {
      id: 'r2',
      carModel: 'Golf 4',
      carMake: 'Volkswagen',
      pickUpLocation: 'Mumbai',
      dropOffLocation: 'Pune',
      pickUpDate: '2024-01-20',
      dropOffDate: '2024-01-25',
      totalCost: 200,
      status: 'completed'
    },
    {
      id: 'r3',
      carModel: 'e36 2',
      carMake: 'BMW',
      pickUpLocation: 'Kolkata',
      dropOffLocation: 'Delhi',
      pickUpDate: '2024-05-10',
      dropOffDate: '2024-05-15',
      totalCost: 250,
      status: 'upcoming'
    }
  ];

  const mockSavedVehicles = [
    {
      id: 'v1',
      model: 'e36 2',
      make: 'BMW',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Sports',
      pricePerDay: 50
    },
    {
      id: 'v2',
      model: 'Golf 4',
      make: 'Volkswagen',
      image: 'https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Hatchback',
      pricePerDay: 35
    }
  ];

  const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>(mockUser);
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [savedVehicles, setSavedVehicles] = useState(mockSavedVehicles);
    const [activeTab, setActiveTab] = useState('rentals');
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('CarRentalCurrentUser'));
      setUser(user);
      console.log(user);
      
      axios.get(`${API_URL}/reservations/reservationsForUser?customerId=${user.CustomerID}`)
    .then(response => {
      setRentals(response.data);  
      // console.log(response.data);
      
    })
    .catch(error => {
      console.error('Failed to fetch rentals:', error);
      setRentals([]);
    });

    },[])
    useEffect(() => {
        if (!user?.CustomerID) return;
    
        const fetchLikedCars = async () => {
          try {
            const res = await axios.get(`${API_URL}/cars/liked/${user.CustomerID}`);
            setSavedVehicles(res.data);
            console.log(res.data);
            
          } catch (error) {
            console.error("Error fetching liked cars:", error.message);
          }
        };
    
        fetchLikedCars();
      }, [user?.CustomerID]);

    
    const handleUpdateUser = (updatedUser: User) => {
      setUser(updatedUser);
      setIsEditing(false);
      // In a real app, you would save this to your API/backend
    };
    

    const handlePasswordChange = (passwords: {currentPassword: string; newPassword: string}) => {
      // In a real app, you would handle password change via API
      console.log('Password change:', passwords);
      setIsChangingPassword(false);
    };
    
    const handleRemoveSavedVehicle = async(id: string) => {
      try {
        console.log({CustomerID: user.CustomerID,
        VehicleID: id});
        
      const response = await axios.post(`${API_URL}/cars/addLikedCar`, {
        CustomerID: user.CustomerID,
        VehicleID: id,
      });

        if (response.data) {
          setSavedVehicles(prev => prev.filter(vehicle => vehicle.VehicleID !== id));
        } 
      } catch (error) {
        console.error('Error liking car:', error.response?.data || error.message);
      }
      
    };
    useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
    const renderTabContent = () => {
      switch (activeTab) {
        case 'rentals':
          return (
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold mb-4">Your Rental History</h2>
              {rentals.length > 0 ? (
                <div className="space-y-4">
                  {rentals.map(rental => (
                    <RentalHistoryItem key={rental.id} rental={rental} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">You haven't rented any cars yet.</p>
                </div>
              )}
            </div>
          );
          
        case 'favorites':
          return (
            <div>
              <h2 className="text-3xl font-semibold mb-4">Your Saved Vehicles</h2>
              <SavedVehicles vehicles={savedVehicles} onRemove={handleRemoveSavedVehicle} />
            </div>
          );
          
        case 'payment':
          return (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-red-600" />
                  <h2 className="text-3xl font-semibold">Payment Methods</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-2xl">
                  Add and manage your payment methods for rentals.
                </p>
                <div className="mt-4">
                  {/* Payment methods would go here */}
                  <p className="text-center py-8 text-gray-500 text-xl">No payment methods added yet.</p>
                </div>
              </CardContent>
            </Card>
          );
          
        case 'security':
          return (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-red-600" />
                  <h2 className="text-3xl font-semibold">Security Settings</h2>
                </div>
              </CardHeader>
              <CardContent>
                {isChangingPassword ? (
                  <PasswordChangeForm 
                    user={user}
                    onSave={handlePasswordChange}
                    onCancel={() => setIsChangingPassword(false)}
                  />
                ) : (
                  <div>
                    <p className="text-gray-500 mb-4 text-2xl">
                      Manage your password and account security settings.
                    </p>
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="text-red-600 hover:text-red-700 font-medium text-xl"
                    >
                      Change Password
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
          
        case 'settings':
          return (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-red-600" />
                  <h2 className="text-3xl font-semibold">Account Settings</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4 text-xl">
                  Manage your account preferences and notifications.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={user.subscribeToNewsletter}
                      onChange={() => 
                        setUser(prev => ({
                          ...prev, 
                          subscribeToNewsletter: !prev.subscribeToNewsletter
                        }))
                      }
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-xl text-gray-900">
                      Receive email notifications about promotions and special offers
                    </label>
                  </div>
                  {/* More settings would go here */}
                </div>
              </CardContent>
            </Card>
          );
          
        default:
          return null;
      }
    };
    
    return (
      user?(

        
        <div className="min-h-screen bg-gray-100">
                <HeroPages name="Profile" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <h1 className="sr-only">User Profile</h1>
          
          {isEditing ? (
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-3xl font-semibold">Edit Profile</h2>
              </CardHeader>
              <CardContent>
                <EditProfileForm 
                  user={user} 
                  onSave={handleUpdateUser} 
                  onCancel={() => setIsEditing(false)} 
                  />
              </CardContent>
            </Card>
          ) : (
            <ProfileHeader user={user} onEdit={() => setIsEditing(true)} />
          )}
          
          <div className="mt-6">
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

  ):navigate('/')
  )
  
  };

  export default ProfilePage;