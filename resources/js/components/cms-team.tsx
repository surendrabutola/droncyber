import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Import Navigation module
import 'swiper/css';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import {  ChevronLeft, ChevronRight, } from 'lucide-react';


interface CmsModuleDetail {
    name: string;
    designation: string;
    detail: string;
    image: string;
}
interface CmsModule {
    name: string;
    title: string;
    detail: string;
    custom_module_detail: CmsModuleDetail[]
}
interface messageProbs {
    cmsmodule: CmsModule
}
export function CmsTeam({cmsmodule}:messageProbs){
  
    return (
        <section className="bg-white py-18 px-2">
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-zinc-800">{cmsmodule.title}</h2>
                        <span className='text-slate-600 text-xl'>{cmsmodule.detail}</span>
                    </div>
                    <div className="flex space-x-4">
                        {/* Custom Navigation Buttons */}
                        <button  className="swiper-button-prev-custom w-10 h-10 rounded-full bg-yellow-600/20 text-white flex items-center justify-center">
                            <ChevronLeft className='text-yellow-600'></ChevronLeft>
                        </button>
                        <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-yellow-600/20 text-white flex items-center justify-center">
                          <ChevronRight className='text-yellow-600'></ChevronRight>
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="mySwiper"
                >
                    {cmsmodule.custom_module_detail.map((message,index) => (
                        <SwiperSlide key={index+1}>
                            <div className="bg-white px-3 pt-3 pb-4 rounded-lg shadow-md border border-gray-200 h-full flex flex-col gap-4 ">
                                <img
                                        src={`/${message.image}`}
                                        alt=''
                                        className="h-[203px]  border-2 border-gray-300 "
                                    />
                                <div>
                                    <p className="font-semibold text-sm text-black ">{message.name}</p>
                                    <p className="text-slate-700 text-sm">{message.designation}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}