import { Timestamp } from "firebase/firestore/lite";

// TODO:
export declare type Event = any;

// TODO:
export declare type OpeningHour = any;

export declare type BaseDocument = Readonly<{
  createdAt: Timestamp;
  itemId: string;
  updatedAt: Timestamp;
  lastEditAt: Timestamp;
}>;

export declare type BusinessDraft = {
  eventList?: Event[];
  isVisible: boolean;
  bigPhotoURL?: string;
  totalEventCount?: number;
  category: string;
  photoPath?: string;
  photoURL?: string;
  bigPhotoPath?: string;
  name: string;
  couponList?: [];
  totalCouponCount?: number;
  isVerified: boolean;
  openingHours?: OpeningHour[];
};

export declare type Business = BaseDocument & BusinessDraft;
