import { Timestamp } from "firebase/firestore/lite";

export declare type BaseDocument = Readonly<{
  createdAt: Timestamp;
  item: string;
  itemId: string;
}>;

export declare type EventDraft = {
  bannerText: string;
  chipText: string;
  endDate?: Timestamp;
  hasPayment?: boolean;
  location?: string;
  imagePath?: string;
  imageUrl?: string;
  photoPath?: string;
  photoUrl?: string;
  startDate?: Timestamp;
  title?: string;
  website?: string;
};

export declare type Event = EventDraft & BaseDocument;
