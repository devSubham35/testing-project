'use client';
import ReactDOM from 'react-dom';
import useUpload from './hooks/useUpload';
import Wrapper from './components/Wrapper';
import Card from './components/Card';
import UploadCard from './components/UploadCard';


const ImageGallery = () => {

  const {
    imgRef,
    images,
    isModalOpen,
    imagePreviews,
    setImages,
    handleSave,
    handleDelete,
    handleCancel,
    handleFileChange,
    handleUploadClick,

  } = useUpload();





  return (
    <div className='w-full h-full flex justify-center items-center py-5'>
      <Wrapper>
        <div className='w-full h-full flex flex-col justify-between gap-5'>
          {/* Header Section */}
          <div className='w-full flex items-center justify-between'>
            <h1 className='text-blue-950 font-extrabold text-2xl'>Photo Album</h1>
            <div
              className='px-6 py-3 w-fit h-fit rounded-full bg-gradient-to-tr from-blue-950 to-violet-950 
              text-white font-semibold text-[15px] cursor-pointer active:scale-[0.9] duration-1000'
              onClick={handleUploadClick}
            >
              Upload Image
            </div>
          </div>

          {/* Body Section */}
          <div className='w-full h-full overflow-y-scroll hide-scroll'>
            {
              images?.length > 0 ?
                <Card data={images} />
                :
                <div className='w-full h-full flex justify-center 
                items-center text-[30px] font-bold text-[#b1b1b1]'>No Image Uploaded</div>
            }
          </div>
        </div>
      </Wrapper>

      {/* Image Upload Modal */}
      {isModalOpen && ReactDOM.createPortal(
        <div className='z-10 w-full h-full absolute top-0 left-0 flex justify-center items-center backdrop-blur-[5px]'>
          <UploadCard
            imgRef={imgRef}
            data={imagePreviews}
            setImages={setImages}
            onChange={handleFileChange}
            handleDelete={handleDelete}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>,
        document.body
      )}
    </div>
  );
};

export default ImageGallery;
