import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { useCreateRoomMutation, useUpdateRoomMutation } from "@/redux/features/rooms/roomsApi";
import { IRoomData, IRoomFormProps, TError } from "@/types/global";
import { useAmenities } from "@/hooks/useAmenities";
import { useImageUpload } from "@/hooks/useImageUpload";
import AmenitiesSection from "./AmenitiesSection";
import ImagesSection from "./ImagesSection";

const RoomForm: React.FC<IRoomFormProps> = ({
  initialValues,
  isUpdate = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [createRoom, { error: createRoomError }] = useCreateRoomMutation();
  const [updateRoom, { error: updateRoomError }] = useUpdateRoomMutation();
  const navigate = useNavigate();

  const {
    amenities,
    amenityInput,
    setAmenityInput,
    handleAddAmenity,
    handleRemoveAmenity,
  } = useAmenities(initialValues?.amenities);

  const {
    images,
    imageUrls,
    handleImageChange,
    handleRemoveImage,
    uploadImages,
  } = useImageUpload(initialValues?.images);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (amenities.length === 0) {
      return toast.error("Please add at least one amenity");
    }

    if (images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrls = images.length > 0 ? await uploadImages() : [];

      const roomData: IRoomData = {
        name: data.name,
        roomNumber: Number(data.roomNumber),
        floorNo: Number(data.floorNo),
        capacity: Number(data.capacity),
        pricePerSlot: Number(data.pricePerSlot),
        amenities,
        images: [...imageUrls, ...uploadedImageUrls],
      };
      
      if (isUpdate) {
        const result = await updateRoom({
          id: initialValues?._id,
          payload: roomData,
        });
        if (result?.data?.success) {
          toast.success("Room updated successfully");
          navigate("/dashboard");
        }
      } else {
        const result = await createRoom(roomData);
        if (result?.data?.success) {
          toast.success("Room created successfully");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to process images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const error = isUpdate ? updateRoomError : createRoomError;
    if (error) {
      const err = error as TError;
      if (err.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }, [createRoomError, updateRoomError, isUpdate]);

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        {isUpdate ? "Update Room" : "Create Room"}
      </h1>
      <MyForm onSubmit={onSubmit} defaultValues={initialValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MyInput
            width="max-w-[300px]"
            type="text"
            name="name"
            label="Room Name"
          />
          <MyInput
            width="max-w-[300px]"
            type="number"
            name="roomNumber"
            label="Room Number"
          />
          <MyInput
            width="max-w-[300px]"
            type="number"
            name="floorNo"
            label="Floor Number"
          />
          <MyInput
            width="max-w-[300px]"
            type="number"
            name="capacity"
            label="Capacity"
          />
          <MyInput
            width="max-w-[300px]"
            type="number"
            name="pricePerSlot"
            label="Price Per Slot"
          />
        </div>

        <AmenitiesSection
          amenities={amenities}
          amenityInput={amenityInput}
          setAmenityInput={setAmenityInput}
          handleAddAmenity={handleAddAmenity}
          handleRemoveAmenity={handleRemoveAmenity}
        />

        <ImagesSection
          images={images}
          imageUrls={imageUrls}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />

        <Button type="submit" className="bg-primary w-full" disabled={loading}>
          {loading
            ? isUpdate
              ? "Updating..."
              : "Creating..."
            : isUpdate
            ? "Update Room"
            : "Create Room"}
        </Button>
      </MyForm>
    </div>
  );
};

export default RoomForm;