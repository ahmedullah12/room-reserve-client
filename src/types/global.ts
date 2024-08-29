export type TError = {
  status: number;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
};

export type TResponse<T> = {
  error?: TError;
  data: T;
  success: boolean;
  message: string;
};

export type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  __v: number;
  images: string[];
};

export type TSlot = {
  _id: string;
  room: TRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v: number;
};
