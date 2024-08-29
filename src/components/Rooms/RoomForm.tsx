import { useState } from "react";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useCreateRoomMutation, useUpdateRoomMutation } from "@/redux/features/rooms/roomsApi";
import { useNavigate } from "react-router-dom";

interface RoomFormProps {
  initialValues?: {
    _id: string;
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    images: string[]; // URLs if updating, empty if creating
  };
  isUpdate?: boolean;
}

const RoomForm: React.FC<RoomFormProps> = ({ initialValues, isUpdate = false }) => {
  const [amenities, setAmenities] = useState<string[]>(initialValues?.amenities || []);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(initialValues?.images || []);
  const [amenityInput, setAmenityInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [createRoom] = useCreateRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const navigate = useNavigate();

  const handleAddAmenity = () => {
    if (amenityInput && !amenities.includes(amenityInput)) {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput(""); // Clear input after adding
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(amenities.filter((item) => item !== amenity));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveImage = (fileName: string) => {
    // Remove from the local images if it's a new image
    setImages(images.filter((image) => image.name !== fileName));
    // Remove from image URLs if it's an existing image
    setImageUrls(imageUrls.filter((url) => !url.includes(fileName)));
  };

  const uploadImages = async () => {
    const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    const uploadedImageUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(imgbbUrl, formData);
      if (res.data.status === 200) {
        uploadedImageUrls.push(res.data.data.url);
      } else {
        throw new Error("Failed to upload image");
      }
    }

    return uploadedImageUrls;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (amenities.length === 0) {
      alert("Please add at least one amenity.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrls = images.length > 0 ? await uploadImages() : [];

      const roomData = {
        name: data.name,
        roomNo: Number(data.roomNo),
        floorNo: Number(data.floorNo),
        capacity: Number(data.capacity),
        pricePerSlot: Number(data.pricePerSlot),
        amenities,
        images: [...imageUrls, ...uploadedImageUrls],
      };

      console.log(roomData);

      if (isUpdate) {
        // Update room logic
        const result = await updateRoom({ id: initialValues?._id, payload: roomData });
        if (result?.data?.success) {
          toast.success("Room updated successfully");
          navigate("/dashboard");
        }
      } else {
        // Create room logic
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

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        {isUpdate ? "Update Room" : "Create Room"}
      </h1>
      <MyForm onSubmit={onSubmit} defaultValues={initialValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MyInput width="max-w-[300px]" type="text" name="name" label="Room Name" />
          <MyInput width="max-w-[300px]" type="number" name="roomNo" label="Room Number" />
          <MyInput width="max-w-[300px]" type="number" name="floorNo" label="Floor Number" />
          <MyInput width="max-w-[300px]" type="number" name="capacity" label="Capacity" />
          <MyInput width="max-w-[300px]" type="number" name="pricePerSlot" label="Price Per Slot" />
        </div>

        {/* Amenities Field */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Amenities</label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="border-2 border-secondary rounded-md p-2 flex-grow"
              placeholder="Add an amenity"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && amenityInput) {
                  e.preventDefault();
                  handleAddAmenity();
                }
              }}
            />
            <Button onClick={handleAddAmenity} className="bg-secondary text-white">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap mt-4 space-x-2">
            {amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center bg-accent text-sm px-3 py-1 rounded-full"
              >
                {amenity}
                <AiOutlineClose
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveAmenity(amenity)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Images Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border-2 border-secondary p-2 rounded-md w-full"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {/* Existing Image URLs */}
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`existing-preview-${index}`}
                  className="w-full h-24 object-cover rounded-md shadow-md"
                />
                <AiOutlineClose
                  className="absolute top-1 right-1 cursor-pointer bg-white p-1 rounded-full text-red-500"
                  onClick={() => handleRemoveImage(url)}
                />
              </div>
            ))}

            {/* New Image Files */}
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="w-full h-24 object-cover rounded-md shadow-md"
                />
                <AiOutlineClose
                  className="absolute top-1 right-1 cursor-pointer bg-white p-1 rounded-full text-red-500"
                  onClick={() => handleRemoveImage(image.name)}
                />
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="bg-primary w-full" disabled={loading}>
          {loading ? (isUpdate ? "Updating..." : "Creating...") : isUpdate ? "Update Room" : "Create Room"}
        </Button>
      </MyForm>
    </div>
  );
};

export default RoomForm;
