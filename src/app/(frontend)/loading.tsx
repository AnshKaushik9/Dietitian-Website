export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      {/* Subtle pulsing skeleton to match design system guidelines (no aggressive spinners) */}
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
