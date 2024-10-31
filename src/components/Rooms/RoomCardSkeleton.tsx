const RoomCardSkeleton = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg animate-pulse">
      <div className="w-full h-40 object-cover rounded-t-lg bg-gray-300"></div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-400 h-4 w-1/2 bg-gray-400"></h3>
        <p className="text-gray-400 h-4 w-1/2 bg-gray-400 mt-2"></p>
        <p className="text-gray-400 h-4 w-1/2 bg-gray-400 mt-2"></p>
        <div className="bg-gray-400 py-1 px-3 text-[13px] font-semibold rounded-md mt-4"></div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
