"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Calendar from "./Calendar";

type Props = {
  dutyId: string;
};

export default function CalendarWrapper({ dutyId }: Props) {
  const { user } = useAuth();
  const [duty, setDuty] = useState<any>(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchDuty = async () => {
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
    };

    fetchDuty();
  }, [dutyId, user]);

  return duty && <Calendar duty={duty} />;
}
