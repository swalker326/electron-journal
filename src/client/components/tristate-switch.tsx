import React from "react";

type States<T1, T2, T3> = [T1, T2, T3];

export function TriStateSwitch<T extends string>({
  states,
  currentState,
  setState,
  stateMap
}: {
  states: States<T, T, T>;
  currentState: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  stateMap?: Record<T, React.ReactNode>;
}) {
  const cycle = (states: States<T, T, T>) => {
    const [a, b, c] = states;
    switch (currentState) {
      case a:
        return setState(b);
      case b:
        return setState(c);
      case c:
        return setState(a);
    }
    return [b, c, a];
  };

  return (
    <button
      type="button"
      onClick={() => cycle(states)}
      className=" border border-gray-300 rounded-md text-center p-2.5"
    >
      {stateMap?.[currentState] ??
        currentState[0].toUpperCase() + currentState.slice(1)}
    </button>
  );
}
