import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CarouselMediaModalProps {
  images: { url: string; name: string }[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function CarouselMediaModal({
  images,
  open,
  onClose,
  initialIndex = 0,
}: CarouselMediaModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl p-4 overflow-hidden" aria-describedby="media-carousel-description">
        <DialogTitle className="sr-only">Media Carousel</DialogTitle>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-white p-1 shadow hover:bg-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Carousel Container */}
        <div className="relative min-h-[75vh] flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-0 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-200 opacity-50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].name}
            className="max-h-[95vh] w-auto rounded object-contain"
          />

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 z-10 rounded-full bg-white p-2 shadow hover:bg-gray-200 opacity-50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Pagination Indicator */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {currentIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  );
}
