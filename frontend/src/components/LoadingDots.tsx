export function LoadingDots() {
  return (
    <div className="flex space-x-1 p-2">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-purple" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-purple [animation-delay:0.2s]" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-purple [animation-delay:0.4s]" />
    </div>
  );
}