"use server";

import { db } from "./firebaseConfig";
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
  uid: string;
  duty: string;
  dutyTime: Record<string, boolean> | null;
  date: string;
  done: boolean;
}

interface ToggleDutyParams {
  uid: string;
  duty: string;
  dutyTime: Record<string, boolean> | null;
  date: string;
  done: boolean;
}

export const toggleDuty = async ({
  uid,
  duty,
  dutyTime,
  date,
  done,
}: ToggleDutyParams) => {
  const dutyRef = doc(db, "users", uid, "duties", duty);

  try {
    if (done) {
      console.log("Removing date:", date);
      await updateDoc(dutyRef, {
        [`dutyTime.${date}`]: deleteField(),
      });
    } else {
      console.log("Adding date:", date);

      // Якщо dutyTime ще не існує — створюємо з merge
      if (!dutyTime) {
        await setDoc(dutyRef, { dutyTime: { [date]: true } }, { merge: true });
      } else {
        await updateDoc(dutyRef, {
          [`dutyTime.${date}`]: true,
        });
      }
    }

    // Оновлюємо сторінку з розкладу і головну
    revalidatePath("/[duty]", "page");
    revalidatePath("/", "page");
  } catch (error) {
    console.error("❌ Error updating duty:", error);
  }
};

export const deleteDuty = async (uid: string, dutyId: string) => {
  const dutyRef = doc(db, "users", uid, "duties", dutyId);

  try {
    await deleteDoc(dutyRef);
    console.log(`Duty "${dutyId}" successfully deleted.`);

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting duty:", error);
  }
};
