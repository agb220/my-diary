import WeekSchedule from "../calendar/WeekSchedule";
import Button from "../common/Button";

interface ItemDutyProps{
  duty: string;
  dutyTime: any;
}

const  ItemDuty = (props:ItemDutyProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xl font-sans">{props.duty}</span>
          <Button img={"/images/delete.svg"} />
       </div>
       <WeekSchedule dutyTime={props.dutyTime} duty={props.duty} />
    </div>
  )
}

export default ItemDuty;