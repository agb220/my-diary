import DayState from "./DayState";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


const Calendar = () => {
  return (
    <div className="grid grid-cols-7 bg-slate-400 rounded-md p-2">
      {weekDays.map((day,index) => (
        <div className="flex flex-col" key={index}>
              <span className="font-sans text-center text-sm">{day}</span>
              <DayState day={undefined}/>
        </div>
      ))}      
    </div>
  )
}

export default Calendar