import { useRef, useState } from "react";

const useUpload = () => {

    const imgRef = useRef<HTMLInputElement | null>(null)
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleFileChange = () => {
        if (imgRef.current?.files) {
            const files = Array.from(imgRef.current.files);
            const newPreviews: string[] = [];

            files.forEach(file => {
                const previewUrl = URL.createObjectURL(file);
                if (!imagePreviews.includes(previewUrl)) {
                    newPreviews.push(previewUrl);
                }
            });

            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    }

    const handleDelete = (index: number) => {
        setImagePreviews(prev => {
            const newPreviews = [...prev];
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    }

    const handleUploadClick = () => {
        setIsModalOpen(true);
      };
    
      const handleSave = () => {
        setIsModalOpen(false);
        setImages(prev => ([...prev, ...imagePreviews]));
        setImagePreviews([])
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    return {
        imgRef,
        images,
        imagePreviews,
        isModalOpen,
        setImages,
        handleSave,
        handleDelete,
        handleCancel,
        handleFileChange,
        handleUploadClick,
    }
}

export default useUpload