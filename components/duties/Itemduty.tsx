'use client';

import { deleteDuty } from "@/app/actions";
import WeekSchedule from "../calendar/WeekSchedule";
import Button from "../common/Button";

interface ItemDutyProps{
  duty: any;
  dutyTime: any;
}

const ItemDuty = (props: ItemDutyProps) => {

  return (
    <div className="flex flex-col gap-2 w-[320px]">
      <div className="flex justify-between">
        <span className="text-xl font-sans break-words mr-2">{props.duty}</span>
        <Button img={"/images/delete.svg"}
          onClick={() => deleteDuty(props.duty)} />
       </div>
       <WeekSchedule dutyTime={props.dutyTime} duty={props.duty} />
    </div>
  )
}

export default ItemDuty;