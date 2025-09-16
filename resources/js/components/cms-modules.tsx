import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardSwiper } from './card-swiper';
import { Skeleton } from "@/components/ui/skeleton";
import { CmsGallery } from './cms-gallery';
import NewsTicker from './news-ticker';
import { CmsTeam } from './cms-team';
import clsx from 'clsx';
import { CmsWhosWho } from './cms-whos-who';
import CyberAccordion from './accordion';
import EventsCard from './events-card';


interface messageProbs {
    name: string;
     className?: string;
}

interface CmsModuleDetail {
    name: string;
    designation: string;
    detail: string;
    image: string;
}
type CmsModule = {
    id: number;
    name: string;
    title: string;
    detail: string;
    custom_module_detail: CmsModuleDetail[]
};
export function CmsModule({name, className }:messageProbs){
    const [loading, setLoading] = useState(true);
    const [module, setModule] = useState<CmsModule>();

    useEffect(() => {
        let tempName = name;
        if(name === 'advisories'){
            tempName = 'technical-advisories';
        }
        axios.get(`/cmsmodule/${tempName}`)
        .then((response) => {
            if(response.data)
                setModule(response.data);
            setLoading(false);
        })
        .catch((error) => {
            // console.error('Error fetching modules:', error);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <div className="space-y-4 mt-10">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-full rounded-md" />
            </div>;
    }
    
    // return  <CmsGallery  cmsmodule={module}></CmsGallery>
    if(module?.custom_module_detail && module.custom_module_detail.length > 0){
        if(name =='leadership'){
           return  <CardSwiper  cmsmodule={module}></CardSwiper>
        }
        if(name =='gallery'){
           return  <CmsGallery  cmsmodule={module}></CmsGallery>
        }
        if(name =='advisories' || name == 'trainings' || name == 'notification' || name == 'alerts' || name == 'releases' || name == 'bulletins' || name == 'calendar' || name == 'archives'){
           return  <NewsTicker name={name} news={module.custom_module_detail} title = {module.title} className={clsx(className)} />;
        }
        if(name =='team'){
           return  <CmsTeam  cmsmodule={module}></CmsTeam>
        }
        if(name =='whos-who'){
           return  <CmsWhosWho  cmsmodule={module} />
        }
        if(name =='technical-advisories' || name =='cyber-hygiene' || name == 'cybersecurity-tips'){
           return  <CyberAccordion  items={module.custom_module_detail} title = {module.title} content= {module.detail}/>
           
        }
        if(name =='events'){
           return  <EventsCard events={module.custom_module_detail} />
        }
    }
        
    return <></>

}