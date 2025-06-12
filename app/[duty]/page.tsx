"use client";
import { useCallback, useState } from "react";
import CalendarWrapper from "@/components/calendar/CalendarWrapper";

type DutyPageProps = {
  params: { duty: string };
};

export default function DutyPage({ params }: DutyPageProps) {
  const { duty } = params;
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  return (
    <div className="container">
      <CalendarWrapper dutyId={duty} onLoadingChange={handleLoadingChange} />
    </div>
  );
}
