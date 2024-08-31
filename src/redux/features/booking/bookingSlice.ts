import { createSlice } from "@reduxjs/toolkit";

type TBookingInfo = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roomId: string;
  roomName: string;
  date: string;
  time: string[];
  totalAmount: number;
  slots: string[];
};

type TInitialState = {
  bookingInfo: null | TBookingInfo;
};

const initialState: TInitialState = {
  bookingInfo: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
  },
});

export const { setBookingInfo } = bookingSlice.actions;
export default bookingSlice.reducer;
