import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center p-4">
      <h1 className="text-4xl text-center text-purple-300 font-extrabold">
        DIARY
      </h1>
    </Link>
  );
};

export default Logo;
