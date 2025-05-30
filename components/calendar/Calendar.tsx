"use client";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { weekDays } from "./WeekSchedule";
import DayState from "./DayState";
import { toggleDuty } from "@/app/actions";
import { getDateInMonth } from "@/utils/function/getDateInMonth";
import { useAuth } from "@/context/AuthContext";
import { Duty } from "@/app/page";

interface CalendarProps {
  duty: Duty;
}

const Calendar = (props: CalendarProps) => {
  const { user } = useAuth();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dayInMonth, setDayInMonth] = useState(
    getDateInMonth(currentMonth, currentYear)
  );
  const [localDutyTime, setLocalDutyTime] = useState<Record<string, boolean>>(
    props.duty.dutyTime ?? {}
  );

  useEffect(() => {
    setDayInMonth(getDateInMonth(month, year));
    setSelectedDate(new Date(year, month));
  }, [month, year]);

  const goToPrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const getFullDate = () => {
    return `${selectedDate.toLocaleString("en", {
      month: "long",
    })} of ${selectedDate.getFullYear()}`;
  };

  const getCurrentDay = (day: Date) => {
    return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleDayClick = async (day: Date) => {
    const dateStr = getCurrentDay(day);
    const prevDone = localDutyTime?.[dateStr] ?? false;

    if (!user?.uid || !props.duty.id) return;

    await toggleDuty({
      uid: user.uid,
      duty: props.duty.id,
      dutyTime: localDutyTime,
      date: dateStr,
      done: prevDone,
    });

    setLocalDutyTime((prevState) => {
      const newState = { ...prevState };
      if (prevDone) {
        delete newState[dateStr];
      } else {
        newState[dateStr] = true;
      }
      return newState;
    });
  };

  return (
    <div className="w-full rounded-md bg-gray-600 p-2 md:p-4">
      <div className="flex justify-between mx-2 my-4 font-sans text-gray-300">
        <Button
          img={"/images/arrow-next.svg"}
          classname="rotate-180"
          onClick={goToPrevMonth}
        />
        <span>{getFullDate()}</span>
        <Button img={"/images/arrow-next.svg"} onClick={goToNextMonth} />
      </div>
      <div className="grid w-full grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div
            className="flex flex-col items-center p-1 md:p-2 gap-2"
            key={index}
          >
            <span className="font-sans text-sm font-light text-gray-300">
              {day}
            </span>
          </div>
        ))}
        {dayInMonth.map((day, index) => (
          <div
            className="flex flex-col items-center p-1 md:p-2 gap-1 cursor-pointer"
            key={index}
            onClick={() => handleDayClick(day)}
          >
            <span className="font-sans text-sm font-light text-gray-400">
              {day?.getDate()}
            </span>
            {day && localDutyTime !== null && (
              <DayState
                day={
                  localDutyTime ? localDutyTime[getCurrentDay(day)] : undefined
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
