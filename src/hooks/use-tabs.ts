import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";

export default function useTabs(defaultTab: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get("tab") ?? defaultTab,
  );

  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const setControlRef = useCallback(
    (val: string) => (node: HTMLButtonElement | null) => {
      if (node) {
        setControlsRefs((prev) => {
          if (prev[val] === node) return prev;
          return { ...prev, [val]: node };
        });
      }
    },
    [],
  );

  const handleSwitchTab = (val: string | null) => {
    const nextVal = val ?? defaultTab;
    setValue(nextVal);
    setSearchParams({ tab: nextVal }, { replace: true });
  };
  const target = value ? controlsRefs[value] : null;

  return {
    rootRef,
    setControlRef,
    setRootRef,
    handleSwitchTab,
    target,
    value,
  };
}
