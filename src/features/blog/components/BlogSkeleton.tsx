export function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 rounded-t-xl bg-gray-200 dark:bg-gray-700" />
      <div className="p-5">
        <div className="mb-2 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-14 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-10 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex gap-3">
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
          <BlogSkeleton />
        </div>
      ))}
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <article className="animate-pulse">
      <div className="mb-8 h-96 rounded-2xl bg-gray-200 dark:bg-gray-700" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 h-8 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-12 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-6 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-8 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div>
            <div className="mb-1 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </article>
  );
}
