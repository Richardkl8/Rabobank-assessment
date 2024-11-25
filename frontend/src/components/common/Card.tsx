import { FC, ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(className, 'flex items-center justify-center')}>
      <div className="w-full rounded-lg bg-white shadow-lg">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
