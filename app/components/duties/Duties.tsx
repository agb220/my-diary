
import ItemDuty from "./Itemduty"

const MOCK_DUTIES = {
  "daily leetcode": {
    '19.12.2023':true,
    '20.12.2023': true,
    '21.12.2023': false,
  },
   "daily React/NextJS": {
    '19.12.2023':true,
    '20.12.2023': true,
    '21.12.2023': true,
  },
}


const Duties = () => {
  return (
    <>
      {(Object.keys(MOCK_DUTIES).length !== 0) ?
        Object.entries(MOCK_DUTIES).map(([duty], index) => (
          <ItemDuty duty={duty} key={index} />
        )) :
        <h2 className="text-xl  mt-20 font-display text-center">
          You have no registered duty
        </h2>
          }

    </>
  )
}

export default Duties