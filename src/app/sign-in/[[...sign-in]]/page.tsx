import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center   bg-[#131415]">
      <SignIn />
    </div>
  );
}
