"use client";

import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Button from "./common/Button";
import Input from "./common/Input";
import { useAuth } from "@/context/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

interface FormProps {
  btnColorDark?: string;
  isModalForm?: boolean;
  formName?: string; // value which be displayer
  setIsOpenModal?: (arg: boolean) => void;
  fromUrl?: string;
}

const Form = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, signup, user } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    if (!data.email || !data.password) {
      setError("root", {
        type: "manual",
        message: "Please enter email and password",
      });
      setLoading(false);
      return;
    }
    if (isLoggingIn) {
      try {
        await login(data.email, data.password);
      } catch (err) {
        setError("root", {
          type: "manual",
          message: "Incorrect email or password",
        });
      }
      return;
    }
    await signup(data.email, data.password);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl mb-10 text-center font-semibold uppercase">
        {isLoggingIn ? "Login" : "Register"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 max-w-[400px] mx-auto"
      >
        <div className="w-full">
          <Input
            type="text"
            placeholder="email"
            min={2}
            {...register("email", { required: true })}
            errorText="Invalid data"
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            placeholder="password"
            min={5}
            {...register("password", { required: true })}
            errorText="Invalid data"
          />
        </div>
        {errors.root?.message && (
          <div className="flex items-center gap-x-1">
            <span className="text-xs text-red">{errors.root?.message}</span>
          </div>
        )}
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          title="Submit"
          classname="w-full border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-purple-400 after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 text-white hover:!text-gray-200"
        ></Button>
        <div
          className="duration-300 hover:scale-110 cursor-pointer"
          onClick={() => setIsLoggingIn(!isLoggingIn)}
        >
          {!isLoggingIn ? "Login" : "Register"}
        </div>
      </form>
    </div>
  );
};

export default Form;
