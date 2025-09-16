import { ArrowDown, Mail } from 'lucide-react';

interface CmsModuleDetail {
    name: string;
    designation: string;
    detail: string;
    image: string;
    email: string;
}
interface CmsModule {
    name: string;
    title: string;
    detail: string;
    custom_module_detail: CmsModuleDetail[];
}
interface messageProbs {
    cmsmodule: CmsModule;
}
export function CmsWhosWho({ cmsmodule }: messageProbs) {
    return (
        <section className="bg-white md:px-2 pb-10">
            <div className="mx-auto">
                {/* <h2 className="mb-4 text-2xl font-bold text-zinc-800">{cmsmodule.title} </h2> */}
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {cmsmodule.custom_module_detail.map((message, index) => (
                        <div key={index} className="my- mx-3.5 my-4 flex w-[300px] flex-col rounded p-4 bg-slate-50 border-slate-200 shadow">
                            <img src={`/${message.image}`} alt="imge" className="h-[225px] rounded bg-gray-300 shadow"></img>
                            <div className="flex flex-col pt-2">
                                    <p className="font-semibold text-xl text-black ">{message.name}</p>
                                    <p className="text-slate-700 text-lg">{message.designation}</p>
                                    <p className="flex flex-row gap-1 items-center text-sm text-indigo-500"><Mail className='size-4'/><span>{message.email}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
