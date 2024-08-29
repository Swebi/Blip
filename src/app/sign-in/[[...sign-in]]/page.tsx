import SignInLoader from "@/components/signInLoader";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center  ">
      <Suspense fallback={<SignInLoader />}>
        <SignIn />
      </Suspense>
    </div>
  );
}
