import RoomForm from "@/components/Rooms/RoomForm";
import { useGetSingleRoomQuery } from "@/redux/features/rooms/roomsApi";
import { useParams } from "react-router-dom";

const UpdateRoom = () => {
    const {id} = useParams();

    const {data: roomData, isLoading} = useGetSingleRoomQuery(id);
    console.log(roomData);

    if(isLoading) return <p>Loading....</p>
  return (
    <div>
      {
        roomData && <RoomForm isUpdate={true} initialValues={roomData.data}/>
      }
    </div>
  );
};

export default UpdateRoom;