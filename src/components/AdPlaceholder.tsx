const AdPlaceholder = ({ size = "leaderboard" }: { size?: "leaderboard" | "rectangle" | "responsive" }) => {
  const sizeClasses = {
    leaderboard: "h-[70px] max-w-[600px] w-full",
    rectangle: "h-[250px] w-[300px]",
    responsive: "h-[80px] w-full",
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto rounded-lg bg-secondary/50 flex items-center justify-center`}>
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground/50">
        Advertisement Space
      </p>
    </div>
  );
};

export default AdPlaceholder;
