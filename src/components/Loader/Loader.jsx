import { ClipLoader } from "react-spinners";

export default function Loader({
  loading = true,
  color = "#ffffff",
  size = 150,
}) {
  return (
    <div
      className="sweet-loading"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
