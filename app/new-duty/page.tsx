import { kv } from "@vercel/kv";

import Button from "../components/common/Button";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const NewDuty = () => {
    async function newDuty(formData: FormData) {
        "use server";

        const duty = formData.get('duty');
        await kv.hset('duties', { [duty as string]: {} });
        revalidatePath('/');
        redirect("/");
  }

  return (
    <section className="container relative flex flex-col gap-8 px-12 pt-16" >
      <h3 className="text-2xl font-light text-center font-display text-gray-100 bg-slate-400 ">create new duty</h3>
          <form action={newDuty} className="flex flex-col gap-4 mt-4">
              <input type="text" name="duty" id="duty" className="mb-5 p-2 font-sans text-xl text-gray-100 rounded"/>
              <Button title="Save" classname="bg-purple-300" />
              <Button title="Cancel" classname="bg-red-400"/>
          </form>     
    </section>
  )
}

export default NewDuty;