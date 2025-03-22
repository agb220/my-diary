"use server";

import { db } from "./lib/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteField,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

interface ToggleDutyParams {
  duty: string;
  dutyTime: Record<string, boolean> | null;
  date: string;
  done: boolean;
}

export const toggleDuty = async ({
  duty,
  dutyTime,
  date,
  done,
}: ToggleDutyParams) => {
  const day = new Date();
  const currentDay = day.getDate();

  if (!dutyTime || !date || currentDay < Number(date.slice(-2))) {
    return;
  }

  const dutyRef = doc(db, "duties", duty);
  const dutySnap = await getDoc(dutyRef);
  const existingData = dutySnap.exists() ? dutySnap.data() : {};

  const updatedDutyTime = {
    ...existingData,
    [date]: date === undefined ? true : !done,
  };

  await setDoc(dutyRef, updatedDutyTime, { merge: true });

  revalidatePath("/duty/[duty]", "page");
  revalidatePath("/", "page");
};

export const deleteDuty = async (duty: string) => {
  const dutyRef = doc(db, "duties", duty);

  try {
    await deleteDoc(dutyRef);
    console.log(`Duty "${duty}" successfully deleted.`);

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting duty:", error);
  }
};
