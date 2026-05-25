import type React from "react";

const Show = ({
  when,
  fallback,
  children,
}: {
  when: boolean;
  fallback?: React.ReactNode | null;
  children: React.ReactNode;
}) => {
  return when ? children : fallback ? fallback : null;
};

export default Show;
