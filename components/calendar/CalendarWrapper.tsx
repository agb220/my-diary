"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Calendar from "./Calendar";
import Link from "next/link";

type Props = {
  dutyId: string;
  onLoadingChange: (arg: boolean) => void;
};

export default function CalendarWrapper({ dutyId, onLoadingChange }: Props) {
  const { user } = useAuth();
  const [duty, setDuty] = useState<any>(null);
  useEffect(() => {
    if (!user?.uid) return;

    const fetchDuty = async () => {
      onLoadingChange(true);
      try {
        const ref = doc(
          db,
          "users",
          user.uid,
          "duties",
          decodeURIComponent(dutyId)
        );
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setDuty({ id: snap.id, ...snap.data() });
        }
      } catch (error) {
        console.error("Failed to fetch duty:", error);
      } finally {
        onLoadingChange(false);
      }
    };

    fetchDuty();
  }, [dutyId, user, onLoadingChange]);

  return (
    duty && (
      <div className="py-10 flex flex-col gap-10">
        <Link
          href="/"
          className="px-5 py-2 bg-indigo-400 rounded max-w-fit hover:bg-indigo-500 transition-all duration-300 hover:text-white"
        >
          Back
        </Link>

        <Calendar duty={duty} />
      </div>
    )
  );
}
