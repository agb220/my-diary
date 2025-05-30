import CalendarWrapper from "@/components/calendar/CalendarWrapper";
import Link from "next/link";

type DutyPageProps = {
  params: { duty: string };
};

export default function DutyPage({ params }: DutyPageProps) {
  const { duty } = params;

  return (
    <div className="container">
      <div className="py-10 flex flex-col gap-10">
        <Link href="/" className="px-5 py-2 bg-indigo-400 rounded max-w-fit">
          Назад
        </Link>
        <CalendarWrapper dutyId={duty} />
      </div>
    </div>
  );
}
