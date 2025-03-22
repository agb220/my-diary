"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "./lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Duties from "../components/duties/Duties";

export type DutySchedule = { [key: string]: Record<string, boolean> };

export default function Home() {
  const [duties, setDuties] = useState<DutySchedule>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dutiesCollection = collection(db, "duties");

    const unsubscribe = onSnapshot(dutiesCollection, (snapshot) => {
      const dutiesData: DutySchedule = {};
      snapshot.forEach((doc) => {
        dutiesData[doc.id] = doc.data() as Record<string, boolean>;
      });

      setDuties(dutiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="text-gray-100 font-light h-full w-full">
      <div className="flex flex-col gap-10 md:gap-14 justify-between items-center md:mt-12 mt-2 min-h-[60vh]">
        {loading ? (
          <h2 className="text-xl flex items-center justify-center text-center">
            Loading...
          </h2>
        ) : (
          <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 w-full">
            <Duties duties={duties} />
          </div>
        )}
        <Link
          href={"/new-duty"}
          className="px-4 py-2 max-w-[300px] bg-purple-500 rounded items-center text-center hover:bg-purple-400 hover:text-gray-200 duration-300"
        >
          Add new duty
        </Link>
      </div>
    </main>
  );
}
