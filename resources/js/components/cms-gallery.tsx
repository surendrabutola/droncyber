import { ArrowDown } from 'lucide-react';

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
    custom_module_detail: CmsModuleDetail[];
}
interface messageProbs {
    cmsmodule: CmsModule;
}
export function CmsGallery({ cmsmodule }: messageProbs) {
    return (
        <section className="bg-white px-2 py-18">
            <div className="mx-auto">
                <h2 className="mb-4 text-2xl font-bold text-zinc-800">{cmsmodule.title} </h2>
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {cmsmodule.custom_module_detail.map((message, index) => (
                        <div className="my- mx-3.5 my-4 flex min-h-[346px] flex-col rounded p-3 shadow">
                            <img src={`/${message.image}`} alt="imge" className="h-[252px] rounded bg-gray-300 shadow"></img>
                            <div className="flex items-center gap-10 py-3">
                                <span className="text-sm text-slate-900">{message.detail}</span>
                                <a href={`/${message.image}`} target="_blank" rel="noopener noreferrer">
                                    <ArrowDown className="text-blue-500" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
