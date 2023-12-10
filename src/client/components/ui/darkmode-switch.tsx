import { ThemeStates, useDarkMode } from "../../hooks/useDarkmode";
import { TriStateSwitch } from "../tristate-switch";
import { Computer, Moon, Sun } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

export function DarkmodeSwitch() {
  const { theme, setTheme } = useDarkMode();
  return (
    <div className="flex items-center">
      <Tooltip.TooltipProvider>
        <Tooltip.Root>
          <Tooltip.Trigger className="cursor-pointer">
            <TriStateSwitch<ThemeStates>
              states={["dark", "light", "system"]}
              currentState={theme}
              setState={setTheme}
              stateMap={{
                dark: <Moon className="w-5 h-5" />,
                light: <Sun className="w-5 h-5" />,
                system: <Computer className="w-5 h-5" />
              }}
            />
          </Tooltip.Trigger>
          <Tooltip.Content
            sideOffset={5}
            side="top"
            align="center"
            className="bg-gray-200 p-2 rounded-md text-gray-800"
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
            <Tooltip.Arrow className="fill-gray-200" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.TooltipProvider>
    </div>
  );
}
