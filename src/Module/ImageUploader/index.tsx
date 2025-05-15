import React, { useState, useRef, useEffect } from 'react';
import { MdDelete, MdFileDownload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TiMediaPause, TiMediaPlay } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const ImageUploader = () => {

    const fileInputRef: any = useRef(null);
    const [files, setFiles]: any = useState([]);

    const handleFileSelect = (event: any) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = selectedFiles.map(file => ({
            file,
            progress: 0,
            status: 'uploading',
            preview: null,
            id: Date.now() + Math.random(),
            speed: 0,
            lastUpdate: Date.now()
        }));
        setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
        newFiles.forEach(fileObj => {
            createImagePreview(fileObj);
            startUpload(fileObj.id);
        });
    };

    const createImagePreview = (fileObj: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setFiles((prevFiles: any) => prevFiles.map((f: any) => 
                f.id === fileObj.id ? {...f, preview: e.target.result} : f
            ));
        };
        reader.readAsDataURL(fileObj.file);
    };

    const startUpload = (id: any) => {
        const interval = setInterval(() => {
            setFiles((prevFiles: any) => prevFiles.map((f: any) => {
                if (f.id === id) {
                    if (f.progress >= 100) {
                        clearInterval(interval);
                        return {...f, status: 'completed', progress: 100, speed: 0};
                    }
                    const now = Date.now();
                    const timeDiff = (now - f.lastUpdate) / 1000; // in seconds
                    const progressDiff = 10; // We're incrementing by 10 each time
                    const speed = (progressDiff / 100) * f.file.size / timeDiff; // bytes per second
                    return {
                        ...f, 
                        progress: f.progress + 10, 
                        speed: speed,
                        lastUpdate: now
                    };
                }
                return f;
            }));
        }, 500);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        const newFiles = droppedFiles.map(file => ({
            file,
            progress: 0,
            status: 'uploading',
            preview: null,
            id: Date.now() + Math.random(),
            speed: 0,
            lastUpdate: Date.now()
        }));
        setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
        newFiles.forEach(fileObj => {
            createImagePreview(fileObj);
            startUpload(fileObj.id);
        });
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDelete = (id: any) => {
        setFiles((prevFiles: any) => prevFiles.filter((f: any) => f.id !== id));
    };

    const handlePause = (id: any) => {
        setFiles((prevFiles: any) => prevFiles.map((f: any) => 
            f.id === id ? {...f, status: 'paused', speed: 0} : f
        ));
    };

    const handleResume = (id: any) => {
        setFiles((prevFiles: any) => prevFiles.map((f: any) => 
            f.id === id ? {...f, status: 'uploading', lastUpdate: Date.now()} : f
        ));
        startUpload(id);
    };

    const handleCancel = (id: any) => {
        handleDelete(id);
    };

    const handleDownload = (fileObj: any) => {
        const url = URL.createObjectURL(fileObj.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileObj.file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const formatSpeed = (speed: any) => {
        if (speed === 0) return '0 B/s';
        const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
        const i = Math.floor(Math.log(speed) / Math.log(1024));
        return (speed / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];
    };

    return (
        <div>
            <div className='w-[500px] min-h-[250px] rounded-xl bg-white pb-5'>
                <h1 className='w-full font-bold text-[20px] border-b-[1px] p-5 py-3 text-indigo-600'>Upload Photos</h1>
                <div className='w-full h-full p-5'>
                    <div
                        className='w-full h-[200px] cursor-pointer border-[2px] rounded-xl 
                        border-dashed flex flex-col justify-center items-center'
                        onClick={() => fileInputRef.current.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/png, image/jpeg, image/jpg"
                            style={{ display: 'none' }}
                            multiple
                        />
                        <h1 className='text-[15px] font-medium'>Drop your Images or <span className='text-indigo-600'>Browse</span></h1>
                        <p className='font-medium text-gray-400 text-[14px]'>png, jpg, jpeg</p>
                    </div>
                </div>
                {files.map((fileObj: any) => (
                    <div key={fileObj.id} className='w-full p-5 py-0 mb-4'>
                        <div className='w-full flex gap-2'>
                            <div className='w-[70px] h-[70px] bg-gray-200 rounded-md flex-shrink-0 overflow-hidden relative'>
                                {fileObj.status === 'uploading' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                        <AiOutlineLoading3Quarters className='animate-spin text-white text-2xl' />
                                    </div>
                                )}
                                {fileObj.status === 'paused' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                        <TiMediaPause className='text-white text-3xl' />
                                    </div>
                                )}
                                {fileObj.status === 'completed' && fileObj.preview && (
                                    <img src={fileObj.preview} alt="Preview" className='w-full h-full object-cover' />
                                )}
                            </div>

                            <div className='w-full flex flex-col justify-between'>
                                <div className='w-full flex justify-between'>
                                    <div className='w-[220px]'>
                                        <h1 className='text-gray-500 text-[13px] font-medium mb-[2px] truncate'>
                                            {fileObj.file.name}
                                        </h1>
                                        <h1 className='text-gray-400 text-[12px]'>
                                            {(fileObj.file.size / (1024 * 1024)).toFixed(2)}MB | {formatSpeed(fileObj.speed)}
                                        </h1>
                                    </div>
                                    <div className='flex gap-2 text-[14px]'>
                                        {fileObj.status === 'completed' && (
                                            <>
                                                <div className='w-7 h-7 cursor-pointer text-green-500 bg-green-500/20 rounded-md flex justify-center items-center'>
                                                    <FaCheck />
                                                </div>
                                                <div className='w-7 h-7 cursor-pointer text-red-500 bg-red-500/20 rounded-md flex justify-center items-center' onClick={() => handleDelete(fileObj.id)}>
                                                    <MdDelete />
                                                </div>
                                                <div className='w-7 h-7 cursor-pointer text-blue-500 bg-blue-500/20 rounded-md flex justify-center items-center' onClick={() => handleDownload(fileObj)}>
                                                    <MdFileDownload />
                                                </div>
                                            </>
                                        )}
                                        {fileObj.status === 'uploading' && (
                                            <>
                                                <div className='w-7 h-7 cursor-pointer text-yellow-600 bg-yellow-500/20 rounded-md flex justify-center items-center' onClick={() => handlePause(fileObj.id)}>
                                                    <TiMediaPause className='text-[16px]' />
                                                </div>
                                                <div className='w-7 h-7 cursor-pointer text-red-500 bg-red-500/20 rounded-md flex justify-center items-center' onClick={() => handleCancel(fileObj.id)}>
                                                    <RxCross2 />
                                                </div>
                                            </>
                                        )}
                                        {fileObj.status === 'paused' && (
                                            <>
                                                <div className='w-7 h-7 cursor-pointer text-green-600 bg-green-500/20 rounded-md flex justify-center items-center' onClick={() => handleResume(fileObj.id)}>
                                                    <TiMediaPlay className='text-[16px]' />
                                                </div>
                                                <div className='w-7 h-7 cursor-pointer text-red-500 bg-red-500/20 rounded-md flex justify-center items-center' onClick={() => handleCancel(fileObj.id)}>
                                                    <RxCross2 />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className='flex justify-between items-center gap-2'>
                                    <div className='w-full h-2 rounded-xl bg-gray-200 overflow-hidden'>
                                        <div className='h-full bg-indigo-500 rounded-xl' style={{ width: `${fileObj.progress}%` }}></div>
                                    </div>
                                    <h1 className='font-semibold text-indigo-600 text-[12px]'>{fileObj.progress}%</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;