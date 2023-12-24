import Link from "next/link";
import Duties from "./components/duties/Duties";



export default function Home() {
  return (
    <main className="container text-gray-100 font-light  relative flex flex-col gap-8 px-4 pt-16 justify-center items-center">
      <Duties />
      <Link href={"/new-duty"} className="mt-10 p-4 bg-purple-500 rounded">Add new duty</Link>
   </main>
  )
}
