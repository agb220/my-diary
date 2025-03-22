import Calendar from "@/components/calendar/Calendar";
import { db } from "../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const Duty = async ({ params: { duty } }: { params: { duty: string } }) => {
  const decodedDuty = decodeURI(duty);
  const dutyRef = doc(db, "duties", decodedDuty);
  const dutySnap = await getDoc(dutyRef);

  const dutyTime: Record<string, boolean> | null = dutySnap.exists()
    ? (dutySnap.data() as Record<string, boolean>)
    : null;

  return (
    <div className="container">
      <Link href="/" className="px-2 py-1 bg-indigo-400 rounded w-[50px]">
        Back
      </Link>
      <h4 className="text-xl font-light text-center text-gray-200 font-display mb-4 mt-10">
        {decodedDuty}
      </h4>
      <Calendar duty={decodedDuty} dutyTime={dutyTime} />
    </div>
  );
};

export default Duty;
