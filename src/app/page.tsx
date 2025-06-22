import test from "../../public/test.png";
import Image from "next/image";

export default function Home(): React.ReactNode {
  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      <div className="flex w-full flex-col items-center space-y-2">
        <h1 className="ml-8 w-full text-2xl font-bold text-black">
          Probstat Final Preparation
        </h1>
        <Image src={test} alt="event" className="w-full" />
        <div className="scroll-hide my-2 flex w-full flex-row items-center gap-4 overflow-x-auto overflow-y-hidden px-3">
          <button className="text-md rounded-xl bg-[#E26E6E] p-2 font-bold text-white">
            BDSM
          </button>
          <button className="evops-tag">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
          <button className="text-md rounded-xl bg-[#99ACF9] p-2 font-bold text-white">
            math
          </button>
        </div>
      </div>
    </main>
  );
}
