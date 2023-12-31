'use server';

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

interface ToggleDutyParams{
  duty: string,
  dutyTime: Record<string, boolean> | null,
  date: string,
  done:boolean
}

 export const toggleDuty = async ({ duty,dutyTime,date,done}: ToggleDutyParams) => {
   if (!dutyTime || !date) {
     return;
  }
   const updatedDutyTime = {
     [duty]:{...dutyTime, [date]: date === undefined ? true : !done}
   }

   await kv.hset("duties", updatedDutyTime);
   revalidatePath("/duty/[duty]", "page");
   revalidatePath("/", "page");
 }
  
export const deleteDuty = async (duty:string) => {
  await kv.hdel("duties", duty);
  revalidatePath("/");

 }