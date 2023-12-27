import Link from "next/link";
import { kv } from "@vercel/kv";

import Duties from "../components/duties/Duties";

export type DutySchedule = { [duty: string]: Record<string, boolean> } | {};

export default async function Home() {
  const duties: DutySchedule = await kv.hgetall('duties') as DutySchedule;
  return (
    <main className="container text-gray-100 font-light  relative flex flex-col gap-8 px-4 pt-16 justify-center items-center">
      <Duties duties={ duties} />
      <Link href={"/new-duty"} className="mt-10 px-4 py-2 w-[300px] bg-purple-500 rounded items-center text-center">Add new duty</Link>
   </main>
  )
}
