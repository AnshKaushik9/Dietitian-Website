"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-destructive sm:text-4xl">
        Something went wrong!
      </h2>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}
