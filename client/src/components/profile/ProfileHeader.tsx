import React from 'react';
import { User } from '../../types/user';
import { UserCircle, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Button from  '../ui/profileButton.tsx';

interface ProfileHeaderProps {
  user: User;
  onEdit: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEdit }) => {
  return (
    
      <div className="bg-white rounded-xl shadow-profile overflow-hidden">
        <div className="h-[130px] bg-gradient-to-r from-brand-600 to-brand-700"></div>
        <div className="px-6 py-6 sm:px-8 -mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="flex items-center justify-center">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-32 w-32 rounded-full ring-4 ring-white bg-white object-cover shadow-lg" 
                />
              ) : (
                <div className="h-[120px] w-[120px] rounded-full ring-4 ring-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                  <UserCircle className="h-28 w-28 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="mt-6 sm:mt-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                  <div className="flex items-center mt-1 text-2xl text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button onClick={onEdit}  variant="outline" size="lg">
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-8 w-8 text-brand-600 mr-3" />
                  <span className="text-2xl text-gray-600 truncate">{user.email}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-8 w-8 text-brand-600 mr-3" />
                  <span className="text-2xl text-gray-600">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-brand-600 mr-3" />
                  <span className="text-2xl text-gray-600">{user.city}, {user.zipCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
  );
};

export default ProfileHeader;