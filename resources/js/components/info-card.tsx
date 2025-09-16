import { ReactNode } from 'react';
import clsx from 'clsx';
import { bg_infocard } from '@/assets/images/images';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  className?: string;
  iconClassName?: string;
}

export default function InfoCard({
  icon,
  title,
  content,
  className,
  iconClassName,
}: Readonly<InfoCardProps>) {
  return (
    <div
      className={clsx(
        'rounded-lg border bg-white shadow-sm hover:shadow-md transition',
        className
      )}
      style={{
        backgroundImage: `url(${bg_infocard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }}
    >
      <div
        className={clsx(
          'mb-6 flex h-10 w-10 items-center justify-center border-1  rounded-lg',
          iconClassName
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-zinc-800">{title}</h3>
      <p className="mt-[6px] text-sm text-zinc-600">{content}</p>
    </div>
  );
}
