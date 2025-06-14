"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "./modals/ConfirmModal";
import FormModal from "./modals/FormModal";

const Header = () => {
  const { logout, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);

  const handleLogout = async () => {
    if (!user) return;
    await logout();
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    if (!user) {
      setIsModalFormOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <header className="flex justify-between w-full items-center border-b border-purple-400">
      <Logo />
      <Image
        src="/images/user.svg"
        alt="User account"
        width={40}
        height={32}
        className="max-h-8 cursor-pointer"
        onClick={handleOpenModal}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Log out"
        message="Are you sure you want to log out of your account?"
      />
      <FormModal
        isOpen={isModalFormOpen}
        onClose={() => setIsModalFormOpen(false)}
      />
    </header>
  );
};

export default Header;
