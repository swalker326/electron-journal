import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { z } from "zod";

const CodeInputSchema = z.object({
  "code-0": z.string().length(1),
  "code-1": z.string().length(1),
  "code-2": z.string().length(1),
  "code-3": z.string().length(1)
});

type CodeInputType = z.infer<typeof CodeInputSchema>;

export function LockScreen() {
  const codeInputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(CodeInputSchema),
    defaultValues: {
      "code-0": "",
      "code-1": "",
      "code-2": "",
      "code-3": ""
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const newValue = input.value;
    const inputName = input.name;
    console.log(inputName);
    const index = Number(inputName.split("-")[1]);
    const inputRefValue = codeInputRef.current!.value.split("");
    inputRefValue[index] = newValue;
    inputRefValue.join("");
    setCode((current) => {
      const newCode = [...current];
      newCode[index] = newValue;
      return newCode;
    });
    const nextSibling = input.nextElementSibling as HTMLInputElement;
    if (nextSibling) {
      nextSibling.focus();
    }
    // if (index === 3 && codeInputRef.current) {
    //   //submit the form
    //   codeInputRef.current.value = inputRefValue.join("");
    //   formRef.current?.submit();
    // }
  };
  console.log(code);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-semibold text-gray-800dark:text-gray-400">
          Enter code
        </h1>
        <Form
          ref={formRef}
          className="flex flex-col"
          action="/locked"
          method="POST"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex space-x-4">
            <input
              {...register("code-0")}
              // type="password"
              onChange={handleInputChange}
              className="w-16 h-16 border border-gray-800 dark:border-gray-400 bg-white text-center text-2xl font-bold text-gray-700 outline-none rounded-md"
              maxLength={1}
            />
            <input
              {...register("code-1")}
              // type="password"
              className="w-16 h-16 border border-gray-800 dark:border-gray-400 bg-white text-center text-2xl font-bold text-gray-700 outline-none rounded-md"
              maxLength={1}
              onChange={handleInputChange}
            />
            <input
              {...register("code-2")}
              // type="password"
              className="w-16 h-16 border border-gray-800 dark:border-gray-400 bg-white text-center text-2xl font-bold text-gray-700 outline-none rounded-md"
              maxLength={1}
              onChange={handleInputChange}
            />
            <input
              {...register("code-3")}
              // type="password"
              className="w-16 h-16 border border-gray-800 dark:border-gray-400 bg-white text-center text-2xl font-bold text-gray-700 outline-none rounded-md"
              maxLength={1}
              onChange={handleInputChange}
            />
            <input
              className="text-black"
              type="hidden"
              ref={codeInputRef}
              name="code"
            />
          </div>
          <button
            disabled={code.length !== 4}
            type="submit"
            className="mt-4 border border-gray-800 dark:border-gray-400  text-gray-800 dark:text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200  dark:hover:bg-gray-600 disabled:hover:bg-transparent transition-colors duration-300"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
