const BlogContentSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-3xl animate-pulse flex-col">
      <div className="mx-4">
        <div className="mb-8 mt-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-300"></div>
            <div className="ml-2 text-sm font-medium capitalize">
              <div className="h-5 w-24 rounded bg-gray-300"></div>
              <div className="mt-2 h-4 w-36 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-300"></div>
        <div className="h-60 w-full rounded bg-gray-300"></div>
        <div className="mt-6 flex flex-col gap-1">
          {[1, 2, 3].map((_idx) => (
            <div key={_idx} className="h-6 w-full rounded bg-gray-300"></div>
          ))}
          <div className="h-6 w-[80%] rounded bg-gray-300"></div>
        </div>
        <div className="mt-6 flex flex-col gap-1">
          {[1, 2].map((_idx) => (
            <div key={_idx} className="h-6 w-full rounded bg-gray-300"></div>
          ))}
          <div className="h-6 w-[40%] rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogContentSkeleton;
