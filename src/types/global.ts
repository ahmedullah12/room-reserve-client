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
  roomNumber: number;
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
  isDeleted: boolean;
  __v: number;
};

export type TBooking = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roomName: string;
  time: string[];
  date: string;
  slots: string[];
  room: string;
  totalAmount: number;
  isConfirmed: string;
  isRejected: boolean;
  isDeleted: boolean;
};


export type TUser = {
  _id: string
  name: string
  email: string
  phone: string
  role: string
  address: string
  __v: number
}


export interface IRoomFormProps {
  initialValues?: {
    _id: string;
    name: string;
    roomNumber: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    images: string[];
  };
  isUpdate?: boolean;
}

export interface IRoomData {
  name: string;
  roomNumber: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
}