import Link from "next/link";
import DayState from "./DayState";

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeekScheduleProps{
  dutyTime: any;
  duty: string;
}

const WeekSchedule = (props:WeekScheduleProps) => {
  const today = new Date();
  const todayWeekDay = today.getDay();

  console.log('todayWeekDay', todayWeekDay);

  const sortedWeekDays = weekDays.slice(todayWeekDay).concat(weekDays.slice(0,todayWeekDay))

  console.log('sortedWeekDays', sortedWeekDays);

  const last7Days = weekDays.map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index)
    return date.toISOString().slice(0, 10);
  }).reverse();

  console.log('last7Days', last7Days);

  return (
    <Link href={`duty/${props.duty}`} className="grid grid-cols-7 bg-slate-400 rounded-md p-2">
        {sortedWeekDays.map((day,index) => (
          <div className="flex flex-col" key={index}>
            <span className="font-sans text-center text-sm">{day}</span>
            <DayState day={props.dutyTime[last7Days[index]]}/>
          </div>
        ))}    
    </Link>
  )
}

export default WeekSchedule;