import Image from "next/image";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex justify-between w-full items-center border-b border-purple-400 ">
      <Logo />
      <Image
        src="/images/user.svg"
        alt="User account"
        width={40}
        height={32}
        className="max-h-8"
      />
    </header>
  );
};

export default Header;
