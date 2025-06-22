import test from "../../public/test.png";
import Image from "next/image";

export default function Home(): React.ReactNode {
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <div className="flex flex-col items-center border-2 w-full border-accent">
        <h1 className="text-3xl text-black font-bold w-full pl-4">Probstat Final Preparation</h1>
        <Image src={test} alt="event"/>
      </div>
    </main>
  );
}
