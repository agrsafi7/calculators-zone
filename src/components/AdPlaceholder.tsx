const AdPlaceholder = ({ size = "leaderboard" }: { size?: "leaderboard" | "rectangle" | "responsive" }) => {
  const sizeClasses = {
    leaderboard: "h-[90px] max-w-[728px] w-full",
    rectangle: "h-[250px] w-[300px]",
    responsive: "h-[100px] w-full",
  };

  return (
    <div className={`ad-placeholder ${sizeClasses[size]} mx-auto`}>
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Advertisement</p>
        <p className="text-xs opacity-40">
          {size === "leaderboard" && "728×90 Leaderboard Placement"}
          {size === "rectangle" && "300×250 Ad Block"}
          {size === "responsive" && "Responsive Ad Unit"}
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
