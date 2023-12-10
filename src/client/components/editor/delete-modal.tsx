import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export const DeleteDialog = ({ onClick }: { onClick: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="border border-red-400 px-2 py-0.5 rounded-md text-red-400 hover:bg-red-100 transition-colors ease-linear duration-100">
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-200 data-[state=open]:animate-overlayShow opacity-60 fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Delete Entry?
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end gap-2">
            <button
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              className="border border-red-400 px-2 py-0.5 rounded-md text-red-400 hover:bg-red-100 transition-colors ease-linear duration-100"
            >
              Yes Delete
            </button>
            <Dialog.Close asChild>
              <button className="border border-green-400 px-2 py-0.5 rounded-md text-green-400 hover:bg-green-100 transition-colors ease-linear duration-100">
                Go Back
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
