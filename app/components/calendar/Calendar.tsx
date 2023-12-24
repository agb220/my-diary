import { getDateInMonth } from "@/app/utils/function/getDateInMonth";
import Button from "../common/Button"
import { weekDays } from "./WeekSchedule";

const Calendar = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const dayInMonth = getDateInMonth(currentMonth, currentYear);
    const emptyDays = Array(dayInMonth[0].getDay()).fill(null);

    return (
      <div className="w-full my-2 rounded-md bg-gray-600">
        <div className="flex justify-between mx-2 my-4 font-sans text-gray-300">
          <Button img={"/images/arrow-next.svg"} classname="rotate-180" />
          <span>December</span>
          <Button img={"/images/arrow-next.svg"} />
        </div>
          <div className="grid w-full grid-cols-7 mt-2">
            {weekDays.map((day,index) => (
              <div className="flex flex-col items-center p-2" key={index}>
                <span className="font-sans text-sm font-light text-gray-300">{day}</span>
              </div>
            ))}
            {emptyDays.map((_, index) => (
              <div className="flex flex-col items-center p-2" key={index} />
            ))}
            {dayInMonth.map((day, index) => (
              <div className="flex flex-col items-center p-2" key={index}>
                <span className="font-sans text-sm font-light text-gray-400">{day?.getDate()}</span>
              </div>
            ))}    
          </div>
      </div>
  )
}

    export default Calendar;