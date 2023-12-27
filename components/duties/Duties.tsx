
import { DutySchedule } from "@/app/page";
import ItemDuty from "./Itemduty"

type DutiesProps = { duties: DutySchedule };

const Duties =  (props:DutiesProps) => {

  

  return (
    <>
    {props.duties !== null ?
        Object.entries(props.duties).map(([duty, dutyTime], index) => (
          <ItemDuty duty={duty} key={index} dutyTime={dutyTime} />
        )) :
        <h2 className="text-xl  mt-20 font-display text-center">
          You have no registered duty
        </h2>
      } 
    </>
  )
}

export default Duties;