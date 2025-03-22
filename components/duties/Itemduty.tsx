"use client";
import { deleteDuty } from "@/app/actions";
import WeekSchedule from "../calendar/WeekSchedule";
import Button from "../common/Button";

interface ItemDutyProps {
  duty: any;
  dutyTime: any;
  setIsLoading: (arg: boolean) => void;
}

const ItemDuty = (props: ItemDutyProps) => {
  const handleClick = async (duty: string) => {
    props.setIsLoading(true);
    await deleteDuty(duty);
    props.setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl font-sans break-words mr-2">{props.duty}</span>
        <Button
          img={"/images/delete.svg"}
          onClick={() => handleClick(props.duty)}
        />
      </div>
      <WeekSchedule dutyTime={props.dutyTime} duty={props.duty} />
    </div>
  );
};

export default ItemDuty;
