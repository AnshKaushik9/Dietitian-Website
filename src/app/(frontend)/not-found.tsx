import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        We couldn&apos;t find the page you were looking for. It might have been
        moved, or the URL might be incorrect.
      </p>
      <div className="mt-8">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
