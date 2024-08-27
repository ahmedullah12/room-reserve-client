import baseApi from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: ({ searchTerm, price, capacity, sort }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (price)
          params.append("price",price);
        if (capacity)
          params.append("capacity", capacity);
        if (sort) params.append("sort", sort);

        return {
          url: `/rooms?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllRoomsQuery } = roomApi;
