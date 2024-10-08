import Image from "next/image";

export const LogoIcon = () => {
  return (
    <div className="flex items-end">
      <div className="relative w-12 h-12">
        <Image
          src="/images/rook_w.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};
