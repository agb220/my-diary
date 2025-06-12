"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "./firebaseConfig";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import Duties from "../components/duties/Duties";
import { useAuth } from "@/context/AuthContext";

export interface DutyData {
  title: string;
  createdAt: Timestamp;
  dutyTime: Record<string, boolean> | null;
}

export interface Duty extends DutyData {
  id: string;
}

export type DutySchedule = {
  [key: string]: Duty;
};

export default function Home() {
  const [duties, setDuties] = useState<DutySchedule>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);
    const dutiesCollection = collection(db, "users", user?.uid, "duties");

    const unsubscribe = onSnapshot(dutiesCollection, (snapshot) => {
      const dutiesData: DutySchedule = {};
      snapshot.forEach((doc) => {
        dutiesData[doc.id] = {
          id: doc.id,
          ...(doc.data() as DutyData),
        };
      });
      setDuties(dutiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <main className="text-gray-100 font-light h-full w-full">
      {!user ? (
        <h2 className="text-3xl text-center">
          To add duties, please register or log in
        </h2>
      ) : (
        <div className="flex flex-col gap-10 md:gap-14 justify-between items-center md:mt-12 mt-2 min-h-[60vh] py-6">
          {loading ? (
            <h2 className="text-xl flex items-center justify-center text-center">
              Loading...
            </h2>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-6 md:gap-8 lg:gap-10 w-full overflow-x-auto">
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
      )}
    </main>
  );
}
