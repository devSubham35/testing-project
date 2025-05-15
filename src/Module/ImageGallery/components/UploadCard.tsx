import Image from 'next/image';
import React from 'react';

const UploadCard = ({ imgRef, onChange, data, handleDelete, onSave, onCancel }: any) => {
  return (
    <div className='w-[500px] rounded-xl p-4 backdrop-blur-sm bg-[#f1f1f1] shadow-md flex flex-col items-center'>
      <div className='w-full flex justify-between items-center mb-4'>
        <h1 className='mb-4'>Upload Your Favourite Pictures</h1>
        <div>
          <label htmlFor='image' className='px-4 py-2 w-fit h-fit rounded-full bg-gradient-to-tr from-blue-950 to-violet-950 text-white font-semibold text-[14px] cursor-pointer border-[1px] border-white'>
            Upload
          </label>
          <input
            ref={imgRef}
            type="file"
            id="image"
            className='hidden'
            multiple
            onChange={onChange}
          />
        </div>
      </div>

      <div className='w-full h-[200px] overflow-y-scroll hide-scroll rounded-xl border-dashed border-[2px] p-2 text-[#adadad]'>
        {data?.length > 0 ? (
          <div className='flex flex-wrap gap-4'>
            {data.map((preview: any, index: number) => (
              <div key={index} className='relative w-[80px] h-[80px] rounded-xl overflow-hidden'>
                <Image
                  src={preview}
                  alt={`Uploaded Image ${index + 1}`}
                  className="object-cover w-full h-full"
                  width={80}
                  height={80}
                />
                <button
                  onClick={() => handleDelete(index)}
                  className='absolute top-1 right-1 bg-white w-5 h-5 rounded-full flex justify-center items-center text-md'
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='w-full h-full flex justify-center items-center'>No Image Uploaded</div>
        )}
      </div>

      <div className='w-full flex justify-end items-center gap-4 font-semibold mt-6'>
        <button onClick={onSave} className='w-[100px] py-2 border-2 border-emerald-600 bg-emerald-600 text-white rounded-xl'>Save</button>
        <button onClick={onCancel} className='w-[100px] py-2 border-2 border-red-500 rounded-xl text-red-500'>Cancel</button>
      </div>
    </div>
  );
};

export default UploadCard;
