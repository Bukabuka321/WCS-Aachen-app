import { StaticImageData } from "next/image";
import { GeolibInputCoordinates, Timestamp } from "geolib/es/types";
import { SyntheticEvent } from "react";

// * Interfaces for Locals Page *
export interface ILocalCompany {
  id: number | string;
  name: string;
  category: string;
  bigPhotoURL: string | StaticImageData;
  workingHours: string;
  location: string;
  isFavourite: boolean;
  isFreeDelivery?: boolean;
  isBookingNeeded?: boolean;
  longitude: number;
  latitude: number;
  itemId: string;
  description: string;
  website: string;
  instagram: string;
  openingHours: [
    {
      close: {
        day: number;
        time: string;
      };
      open: {
        day: number;
        time: string;
      };
    }
  ];
  couponList: [
    {
      code: string;
      title: string;
    }
  ];
  logoImageUrl: string;
  isVisible: boolean;
}

export interface ILocalProps {
  company: ILocalCompany;
  userLocation: ILocation;
  handleFilterbyDistance: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeToUserToggleEnabled: boolean;
  isLiked: boolean;
  handleAddMerken: (id: string) => void;
  userTimeInfo: IUserTime;
  closeToUserTimeToggleEnabled: boolean;
  handleFilterByOpenTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ILocation {
  loaded: boolean;
  coordinates: GeolibInputCoordinates;
  error: string;
}

export interface IfilteredCategories {
  id: number | string;
  category?: string;
  url: string | undefined;
}

export interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
  placeholder: string;
}

export interface ILocalsFiltersProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isChecked: boolean;
}

export interface ILocalLocation {
  longitude: number;
  latitude: number;
}

export interface IUserTime {
  userDay: number;
  userTime: string;
}

export interface ILikedLocal {
  handleAddMerken: (event: SyntheticEvent<Element, Event>) => void;
  isLiked: boolean;
  likedLocals: string[];
}

// Interfaces for Locals Page * END *

// Interfaces for Events Page * START *

export interface IEvents {
  id: string;
  businessId: string;
  description: string;
  imageUrl: string;
  endDate?: ITimestamp;
  startDate?: ITimestamp;
  location: string;
  latitude?: number;
  longitude?: number;
  title: string;
  website?: string;
  timeFrames: ITimeFrames[];
}

export interface ITimeFrames {
  id: string;
  location: string;
  startDate: ITimestamp;
  endDate: ITimestamp;
  title: string;
  latitude: number;
  longitude: number;
}

export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IBusiness {
  logoImageUrl: string;
  category: string;
  isVisible: boolean;
  name: string;
  itemId: string;
}

// Interfaces for Events Page * END *
