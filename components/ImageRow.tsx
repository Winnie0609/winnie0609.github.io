import Image from 'next/image';

interface ImageRowProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  gap?: number;
}

export function ImageRow({ images, gap = 4 }: ImageRowProps) {
  return (
    <div className={`flex gap-${gap} my-8 flex-col sm:flex-row`}>
      {images.map((image, index) => (
        <div key={index} className="flex-1">
          <Image
            src={image.src}
            alt={image.alt}
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="w-full h-auto rounded-sm"
          />
        </div>
      ))}
    </div>
  );
}
