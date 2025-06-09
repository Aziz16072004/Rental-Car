import React from 'react';
import { Rental } from '../../types/user';
import Card, { CardContent } from  '../ui/profileCard.tsx';
import { Calendar, MapPin, Clock, DollarSign, Car } from 'lucide-react';

interface RentalHistoryItemProps {
  rental: Rental;
}

const RentalHistoryItem: React.FC<RentalHistoryItemProps> = ({ rental }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex py-1 items-center text-xl mb-2">
              <Car className="w-8 h-8 mr-2 text-red-600" />
              <h3 className="text-2xl font-semibold">{rental.Mark} {rental.Model}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div className="flex py-1 items-center text-xl">
                <MapPin className="w-7 h-7 mr-2 text-gray-500" />
                <span>Pick-up: {rental.PickupLocation}</span>
              </div>
              <div className="flex py-1 items-center text-xl">
                <Calendar className="w-7 h-7 mr-2 text-gray-500" />
                <span>Date: {rental.StartDate}</span>
              </div>
              <div className="flex py-1 items-center text-xl">
                <MapPin className="w-7 h-7 mr-2 text-gray-500" />
                <span>Drop-off: {rental.EndDate}</span>
              </div>
              <div className="flex py-1 items-center text-xl">
                <Calendar className="w-7 h-7 mr-2 text-gray-500" />
                <span>Date: {rental.EndDate}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
            <span className={`px-4 py-2 rounded-full text-xl font-medium ${getStatusColor(rental.status)}`}>
              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
            </span>
            <div className="mt-2 md:mt-0 flex py-1 items-center text-xl">
              <DollarSign className="w-7 h-7 text-gray-500" />
              <span className="text-2xl font-semibold">${Number(rental.total).toFixed(2)}</span>
            </div>
          
            
            <button className="mt-2 text-sm text-red-600 hover:underline flex py-1 items-center text-[1.4rem]">
              <Clock className="w-3 h-3 mr-1" />
              View Details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalHistoryItem;