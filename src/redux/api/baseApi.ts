import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

type TCustomError = {
  status?: number;
  data?: {
    message?: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://assignment-3-six-liart.vercel.app/api",
  credentials: "include",
  //this is for sending token when making a request to backend
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  const error = result?.error as TCustomError;

  if (error?.status === 404) {
    toast.error(error?.data?.message || "An error occurred.");
  }

  if (error?.status === 401) {
    const res = await fetch("https://assignment-3-six-liart.vercel.app/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (data?.data?.accessToken) {      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  
  tagTypes: ["Rooms", "Slots", "Bookings", "User"],
  endpoints: () => ({}),
});
