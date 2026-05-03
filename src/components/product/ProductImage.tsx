'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  brand: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ src, alt, brand, fill, width, height, className = '', priority }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`w-full h-full bg-surf3 flex flex-col items-center justify-center gap-1 ${className}`}>
        <span className="text-2xl font-medium text-txt-3">
          {brand.charAt(0).toUpperCase()}
        </span>
        <span className="text-[9px] text-txt-4">No image</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain ${className}`}
        onError={() => setError(true)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
