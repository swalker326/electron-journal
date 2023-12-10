import * as Menubar from "@radix-ui/react-menubar";
import { Settings } from "lucide-react";

export const EntryMenu = ({
  onEdit,
  onDelete
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Menubar.Root className="flex rounded-md h-8 border border-gray-400">
      <Menubar.Menu>
        <Menubar.Trigger className=" bg-white dark:bg-gray-950 py-0.5 px-2 outline-none select-none font-medium leading-none rounded flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          <Settings size={16} />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="min-w-[150px] bg-white dark:bg-gray-950 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ease-in-out duration-100 rounded flex items-center h-[25px] px-[10px] relative outline-none data-[disabled]:pointer-events-none">
              <button className="text-left w-full" onClick={onEdit}>
                Edit
              </button>
            </Menubar.Item>
            <Menubar.Item className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ease-in-out duration-100 rounded flex items-center h-[25px] px-[10px] relative outline-none data-[disabled]:pointer-events-none">
              <button className="text-left w-full" onClick={onDelete}>
                Delete
              </button>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};
