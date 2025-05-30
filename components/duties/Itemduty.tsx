"use client";
import { deleteDuty } from "@/app/actions";
import WeekSchedule from "../calendar/WeekSchedule";
import Button from "../common/Button";
import { Duty } from "@/app/page";
import { useAuth } from "@/context/AuthContext";

interface ItemDutyProps {
  duty: Duty;
  setIsLoading: (arg: boolean) => void;
}

const ItemDuty = (props: ItemDutyProps) => {
  const { user } = useAuth();

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
          onClick={() => handleClick(props.duty.id)}
        />
      </div>
      <WeekSchedule duty={props.duty} />
    </div>
  );
};

export default ItemDuty;
