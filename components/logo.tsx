import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-end">
      <div className="relative w-12 h-12">
        <Image src="/images/rook_w.png" alt="logo" layout="fill" />
      </div>
      <h1 className="-ml-2 pb-1 text-3xl font-bold">
        {/* <span className="text-blue-500">Y</span> */}
        Castle
      </h1>
    </div>
  );
};
