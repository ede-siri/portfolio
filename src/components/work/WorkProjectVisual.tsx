import Image from "next/image";

type WorkProjectVisualProps = {
  image: string;
  alt: string;
  featured?: boolean;
};

export default function WorkProjectVisual({
  image,
  alt,
  featured = false,
}: WorkProjectVisualProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#080808] ${
        featured
          ? "min-h-[14rem] md:min-h-[22rem]"
          : "aspect-[4/3] min-h-[12rem]"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        unoptimized
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 50vw"
        }
        className="object-cover"
        priority={featured}
      />
    </div>
  );
}
