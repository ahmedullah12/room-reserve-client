import Loader from "@/components/Loader";
import RoomForm from "@/components/Rooms/RoomForm";
import { useGetSingleRoomQuery } from "@/redux/features/rooms/roomsApi";
import { useParams } from "react-router-dom";

const UpdateRoom = () => {
    const {id} = useParams();

    const {data: roomData, isLoading} = useGetSingleRoomQuery(id);
    if(isLoading) return <Loader/>
  return (
    <div>
      {
        roomData && <RoomForm isUpdate={true} initialValues={roomData.data}/>
      }
    </div>
  );
};

export default UpdateRoom;