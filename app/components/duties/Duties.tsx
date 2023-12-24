
import { kv } from "@vercel/kv"
import ItemDuty from "./Itemduty"

const MOCK_DUTIES = {
  // "daily leetcode": {
  //   '19.12.2023':true,
  //   '20.12.2023': true,
  //   '21.12.2023': false,
  // },
  //  "daily React/NextJS": {
  //   '19.12.2023':true,
  //   '20.12.2023': true,
  //   '21.12.2023': true,
  // },
}

type DutySchedule = { [duty: string]: Record<string, boolean> } | {};


const Duties = async () => {
  const duties: DutySchedule = await kv.hgetall('duties') as DutySchedule;

  return (
    <>
      {(Object.keys(duties).length !== 0) ?
        Object.entries(duties).map(([duty, dutyTime], index) => (
          <ItemDuty duty={duty} key={index} dutyTime={dutyTime} />
        )) :
        <h2 className="text-xl  mt-20 font-display text-center">
          You have no registered duty
        </h2>
          }

    </>
  )
}

export default Duties