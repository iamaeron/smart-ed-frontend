import { Loader } from "@mantine/core";

const ListPending = ({
  pending,
  children,
  style,
}: {
  pending: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        position: "relative",
        ...style,
      }}
    >
      {pending && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <Loader />
        </div>
      )}

      <div
        style={{
          opacity: pending ? 0.5 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ListPending;
