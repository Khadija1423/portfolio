import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({ src, alt, className = '', containerClassName = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border ${containerClassName}`}>

      {/* Loading Skeleton/Blur Placeholder */}
      <div
        className={`absolute inset-0 bg-light-border/10 dark:bg-dark-border/10 animate-pulse transition-opacity duration-500 ease-in-out ${isLoaded || hasError ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-light-bg dark:bg-dark-bg text-light-text/50 dark:text-dark-text/50 text-sm font-bold uppercase tracking-wider">
          Image not found
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
