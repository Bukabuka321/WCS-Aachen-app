import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(`/`);
    }, 5000);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white gap-y-7">
      <h1 className="text-6xl">Error 404</h1>
      <h2 className="text-3xl">Page was not created</h2>
      <p className="text-xl">
        You will be redirect to the home page in 5 seconds
      </p>
      <Link
        className="rounded-full bg-aachen-yellow px-4 py-4 text-black"
        href="/"
      >
        Return to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
