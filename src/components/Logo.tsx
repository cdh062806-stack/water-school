import React from 'react';
import { cn } from '@/src/lib/utils';
import { Waves } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 40 }: LogoProps) {
  return (
    <div 
      className={cn("relative flex items-center justify-center rounded-full bg-sky-600 overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <Waves size={size * 0.6} className="text-white" />
    </div>
  );
}
