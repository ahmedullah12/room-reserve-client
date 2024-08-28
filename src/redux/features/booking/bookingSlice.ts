import { createSlice } from "@reduxjs/toolkit";

type TBookingInfo = {
    _id: string
    name: string
    email: string
    phone: string
    role: string
    address: string
    __v: number
    roomName: string
    date: string
    time: string[]
    cost: number
    slots: string[]
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
        state.bookingInfo = action.payload
    }
  },
});


export const { setBookingInfo } = bookingSlice.actions;
export default bookingSlice.reducer;