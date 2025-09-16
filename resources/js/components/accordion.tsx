import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface AccordionItem {
  name: string;
  detail: string;
  title: string;
  status: 'High Severity' | 'Moderate Severity' | 'Low Severity';
}

interface CyberAccordionProps {
  items: AccordionItem[];
  title?: string;
  content?: string;
  severityColors?: {
    [key in AccordionItem['status']]?: string;
  };
}

export default function CyberAccordion({
  items,
  title,
  content,
  severityColors = {},
}: Readonly<CyberAccordionProps>) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // 👇 Severity color handler (auto fallback)
  const getSeverityClass = (status: AccordionItem['status']) => {
    return (
      severityColors?.[status] ||
      {
        'High Severity': 'text-red-500',
        'Moderate Severity': 'text-blue-500',
        'Low Severity': 'text-green-500',
      }[status] ||
      'text-black'
    );
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white mx-auto rounded-md pb-12">
      <h2 className="text-2xl font-semibold my-2">{title}</h2>
      <h2 className="text-xl text-slate-600 mb-8">{content}</h2>
      <div className="divide-y">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`border-t-2 border-b-2 border-slate-200 ${isOpen ? 'bg-slate-50' : ''}`}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-4 pt-6 pb-2 cursor-pointer hover:bg-gray-50 text-left"
              >
                <div>
                  <span className="text-lg/6 font-semibold">{item.name}</span>{' '}
                  <span className={`ml-2 font-semibold ${getSeverityClass(item.status)}`}>
                  {item.status}
                  </span>
                </div>
                <div className="text-zinc-600 font-bold">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              {isOpen && item.detail && (
                <div className="bg-slate-50 text-base/6 text-slate-600 px-4 pb-6">
                  {item.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
