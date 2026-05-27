type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-3xl">
            ⚠️
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Something went wrong
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground">
            The application encountered an unexpected error.
          </p>
        </div>

        {/* Error message */}
        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
          <p className="wrap-break-words text-sm text-muted-foreground">
            {error.message || "Unexpected application error"}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]">
            Try again
          </button>

          <button
            onClick={() => window.location.replace("/")}
            className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-accent active:scale-[0.98]">
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}
