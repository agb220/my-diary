"use client";
import { useState } from "react";
import WeekSchedule from "../calendar/WeekSchedule";
import Button from "../common/Button";
import { Duty } from "@/app/page";
import { deleteDuty } from "@/app/actions";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "../modals/ConfirmModal";

interface ItemDutyProps {
  duty: Duty;
  setIsLoading: (arg: boolean) => void;
}

const ItemDuty = (props: ItemDutyProps) => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async (id: string) => {
    props.setIsLoading(true);

    if (user) await deleteDuty(user?.uid, id);
    props.setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl font-sans break-words mr-2">
          {props.duty.title}
        </span>
        <Button
          img={"/images/delete.svg"}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <WeekSchedule duty={props.duty} />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleClick(props.duty.id)}
        title="Deletion"
        message="Are you sure you want to delete duty?"
      />
    </div>
  );
};

export default ItemDuty;
