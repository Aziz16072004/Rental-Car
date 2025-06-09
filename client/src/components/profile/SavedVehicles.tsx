import React from 'react';
import Card, { CardContent } from '../ui/profileCard.tsx';
import { Heart, Car } from 'lucide-react';
import Button from '../ui/profileButton.tsx';
import { Link } from 'react-router-dom';

interface SavedVehicleProps {
  vehicles: {
    id: string;
    Model: string;
    Mark: string;
    ImageURL: string;
    category: string;
    pricePerDay: number;
  }[];
  onRemove: (id: string) => void;
}

const SavedVehicles: React.FC<SavedVehicleProps> = ({ vehicles, onRemove }) => {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-10">
        <Car className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No saved vehicles</h3>
        <p className="mt-1 text-sm text-gray-500">
          You haven't saved any vehicles yet. Browse our collection and save your favorites.
        </p>
        <div className="mt-6">
          <Link to="/">

          <Button>
             Browse Vehicles
             </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {console.log(vehicle)}
          <div className="relative h-60 bg-gray-200">
            <img
              src={vehicle.ImageURL}
              alt={`${vehicle.Mark} ${vehicle.Model}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onRemove(vehicle.VehicleID)}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50 transition-colors duration-200"
            >
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            </button>
          </div>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className='py-4'>
                <h3 className="font-semibold text-2xl text-gray-900">{vehicle.Mark} {vehicle.Model}</h3>
                <p className="text-sm text-xl text-gray-500">{vehicle.fuel}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600">${vehicle.DailyRate}</p>
                <p className="text-xl text-gray-500">per day</p>
              </div>
            </div>
            <div className="mt-4">
              <Button fullWidth>Reserve Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedVehicles;