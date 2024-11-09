import { useState } from 'react';

export const useImageUpload = (initialImageUrls: string[] = []) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveImage = (fileName: string) => {
    setImages(images.filter((image) => image.name !== fileName));
    setImageUrls(imageUrls.filter((url) => !url.includes(fileName)));
  };

  const uploadImages = async () => {
    const uploadedImageUrls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "myCloud");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          uploadedImageUrls.push(data.secure_url);
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image");
      }
    }

    return uploadedImageUrls;
  };

  return {
    images,
    imageUrls,
    handleImageChange,
    handleRemoveImage,
    uploadImages,
  };
};