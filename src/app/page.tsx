'use client'
import React, { useState } from 'react';
import ImageGallery from '@/Module/ImageGallery/ImageGallery';
import AuthPageOne from '@/Module/ModernAuthForm_01/AuthPageOne';
import AuthPageTwo from '@/Module/ModernAuthForm_02/AuthPageTwo';
import ImageUploader from '@/Module/ImageUploader';
import Docs from '@/Module/DocComponent/Docs';
import ImageWorldMap from '@/components/WorldMap';

const Page = () => {

  const [selectedComponent, setSelectedComponent] = useState('Form 1');

  const headerData = [
    { title: 'Form 1', component: <AuthPageOne /> },
    { title: 'Form 2', component: <AuthPageTwo /> },
    { title: 'Image Gallery', component: <ImageGallery /> },
    { title: 'Image Uploader', component: <ImageUploader /> },
    { title: 'Make Docs', component: <Docs /> },
    { title: 'Map', component: <ImageWorldMap /> },
  ];

  return (
    <div className="w-full h-screen overflow-hidden p-10 bg-[#e5e8f0]">
      <div className="w-full h-[50px] bg-transparent">
        <div className="w-full flex justify-center items-center gap-8 font-semibold">
          {headerData.map(({ title }) => (
            <h1
              key={title}
              className={`cursor-pointer ${selectedComponent === title ? "text-blue-600" : ""}`}
              onClick={() => setSelectedComponent(title)}
            >
              {title}
            </h1>
          ))}
        </div>
      </div>

      <div
        className="w-full flex justify-center pt-8 overflow-y-scroll hide-scroll"
        style={{ height: 'calc(100vh - 90px)' }}
      >
        {headerData.find((item) => item.title === selectedComponent)?.component}
      </div>

    </div>
  );
};

export default Page;
