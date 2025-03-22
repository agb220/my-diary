"use client";
import { useState } from "react";
import { DutySchedule } from "@/app/page";
import ItemDuty from "./Itemduty";

type DutiesProps = { duties: DutySchedule };

const Duties = (props: DutiesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <h2 className="text-xl mt-20 text-center w-full md:col-span-2 lg:col-span-4">
          Loading...
        </h2>
      ) : props.duties !== null && Object.keys(props.duties).length > 0 ? (
        Object.entries(props.duties).map(([duty, dutyTime], index) => (
          <ItemDuty
            duty={duty}
            key={index}
            dutyTime={dutyTime}
            setIsLoading={setIsLoading}
          />
        ))
      ) : (
        <h2 className="text-xl mt-20 text-center">
          You have no registered duty
        </h2>
      )}
    </>
  );
};

export default Duties;
