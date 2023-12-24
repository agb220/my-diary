import Calendar from "@/app/components/calendar/Calendar";
import { kv } from "@vercel/kv";
import Link from "next/link";

// interface DutyProps{
//   duty:string
// }

const  Duty = async  ({params: {duty},}:{params:{duty:string}}) => {
const decodedDuty = decodeURI(duty)

  return (
    <div className="container relative flex flex-col gap-8 px-12 pt-16">
      <Link href={"/"} className="px-2 py-1 bg-indigo-400 rounded w-[50px]">Back</Link>
      <h4 className="text-xl font-light text-center text-gray-200 font-display">{decodedDuty}</h4>
      <Calendar/>
    </div>
  )
}

export default Duty;