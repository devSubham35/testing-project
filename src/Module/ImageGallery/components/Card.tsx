import Image from 'next/image'
import React from 'react'

const Card = ({ data }: any) => {

  
  return (
    
          <div className='w-full h-full overflow-y-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 
          gap-3 md:gap-6 hide-scroll' 
          style={{ height: "calc(100vh - 110px)"}}>
            {
              data?.map((image: any, index: number)=>(
                <div className='w-full h-[250px] rounded-xl bg-[#efefef] overflow-hidden'>
                  <Image src={image} alt="" width={500} height={500} className='w-full h-full object-cover' />
                </div>
              ))
            }
          </div>
  )
}

export default Card