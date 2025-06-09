import React from 'react';
import { Car, Clock, CreditCard, Settings, Lock, Heart } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'rentals', label: 'Rental History', icon: <Clock className="w-5 h-5" /> },
    { id: 'favorites', label: 'Saved Vehicles', icon: <Heart className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white rounded-xl shadow-profile overflow-hidden mb-6">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-xl tab-button ${
              activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;