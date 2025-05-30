"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import Button from "../../components/common/Button";

const NewDuty = () => {
  const [duty, setDuty] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  async function newDuty(event: React.FormEvent) {
    event.preventDefault();

    if (!duty.trim() || !user) return;

    try {
      const dutyRef = collection(db, "users", user.uid, "duties");
      await addDoc(dutyRef, {
        title: duty,
        dutyTime: {},
        createdAt: serverTimestamp(),
      });

      router.push("/");
    } catch (error) {
      console.error("Помилка при додаванні duty:", error);
    }
  }

  // console.log("user", user);

  return (
    <section className="container flex flex-col gap-8">
      <h3 className="text-2xl font-light text-center font-display text-gray-100">
        create new duty
      </h3>
      <form onSubmit={newDuty} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="duty"
          id="duty"
          value={duty}
          onChange={(e) => setDuty(e.target.value)}
          className="mb-5 p-2 font-sans text-xl rounded bg-slate-400 hover:bg-slate-300 duration-300"
        />
        <Button
          title="Save"
          classname="bg-purple-300 hover:bg-purple-400 hover:text-grey-100 duration-300"
          type="submit"
        />
        <Button
          title="Cancel"
          classname="bg-red-400 hover:bg-red-500 hover:text-gray-100 duration-300"
          onClick={() => router.push("/")}
        />
      </form>
    </section>
  );
};

export default NewDuty;
