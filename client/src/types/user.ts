  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number;
    adresse: string;
    city: string;
    zipCode: string;
    profileImage?: string;
    subscribeToNewsletter: boolean;
    createdAt: Date;
  }
  
  export interface Rental {
    id: string;
    carModel: string;
    carMake: string;
    pickUpLocation: string;
    dropOffLocation: string;
    pickUpDate: string;
    dropOffDate: string;
    totalCost: number;
    status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  }
  
  export interface UserProfile {
    user: User;
    rentals: Rental[];
    favoriteVehicles: string[];
  }