import Calendar from "../calendar/Calendar";
import Button from "../common/Button";

interface ItemDutyProps{
    duty: string;
}

const  ItemDuty = (props:ItemDutyProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xl font-sans">{props.duty}</span>
          <Button img={"/images/delete.svg"} />
       </div>
       <Calendar/>
    </div>
  )
}

export default ItemDuty;