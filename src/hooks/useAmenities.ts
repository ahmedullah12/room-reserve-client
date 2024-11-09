import { useState } from 'react';

export const useAmenities = (initialAmenities: string[] = []) => {
  const [amenities, setAmenities] = useState<string[]>(initialAmenities);
  const [amenityInput, setAmenityInput] = useState<string>("");

  const handleAddAmenity = () => {
    if (amenityInput && !amenities.includes(amenityInput)) {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(amenities.filter((item) => item !== amenity));
  };

  return {
    amenities,
    amenityInput,
    setAmenityInput,
    handleAddAmenity,
    handleRemoveAmenity,
  };
};