import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";

interface AmenitiesSectionProps {
  amenities: string[];
  amenityInput: string;
  setAmenityInput: (value: string) => void;
  handleAddAmenity: () => void;
  handleRemoveAmenity: (amenity: string) => void;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities,
  amenityInput,
  setAmenityInput,
  handleAddAmenity,
  handleRemoveAmenity,
}) => (
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
      <Button
        type="button"
        onClick={handleAddAmenity}
        className="bg-secondary text-white"
      >
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
);

export default AmenitiesSection;