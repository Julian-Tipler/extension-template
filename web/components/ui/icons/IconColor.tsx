import Image from "next/image";

export const IconColor = ({
  size = "24",
  className,
}: {
  size?: string;
  className?: string;
}) => {
  return (
    <div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        overflow: "hidden",
        borderRadius: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Light background to make rounded edges visible
      }}
    >
      <Image
        src="https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-happy.png"
        alt="Mom Icon"
        width={parseInt(size)}
        height={parseInt(size)}
        className={`${className} object-contain`}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};
