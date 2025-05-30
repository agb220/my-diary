import Link from "next/link";
import DayState from "./DayState";
import { Duty } from "@/app/page";

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeekScheduleProps {
  duty: Duty;
}

const WeekSchedule = (props: WeekScheduleProps) => {
  const today = new Date();
  const todayWeekDay = today.getDay();
  const sortedWeekDays = weekDays
    .slice(todayWeekDay)
    .concat(weekDays.slice(0, todayWeekDay));

  const last7Days = weekDays
    .map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toISOString().slice(0, 10);
    })
    .reverse();

  return (
    <Link
      href={`duty/${props.duty.id}`}
      className="grid grid-cols-7 bg-slate-400 rounded-md px-1 md:px-2  md:py-4 py-2 gap-1 overflow-y-auto"
    >
      {sortedWeekDays.map((day, index) => (
        <div
          className="flex flex-col items-center justify-center gap-2"
          key={index}
        >
          <span className="font-sans text-center text-[10px] sm:text-xs md:text-sm">
            {day}
          </span>
          {day && props.duty.dutyTime !== null && (
            <DayState day={props?.duty.dutyTime[last7Days[index]]} />
          )}
        </div>
      ))}
    </Link>
  );
};

export default WeekSchedule;
