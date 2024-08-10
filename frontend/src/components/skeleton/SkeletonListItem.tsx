const ListItemSkeleton = () => {
  return (
    <div className="flex animate-pulse cursor-pointer flex-col border-b-2 p-5">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <div className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-300 sm:h-8 sm:w-8">
          </div>
          <span className="ml-2 h-4 w-20 rounded bg-gray-300"></span>
        </div>
        <div className="flex items-center text-xs sm:text-sm">
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <span className="ml-2 h-4 w-12 rounded bg-gray-300"></span>
          <span className="ml-2 h-4 w-12 rounded bg-gray-300"></span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-3 flex flex-col w-[75%]">
          <div className="h-6 w-[80%] min-w-60 rounded bg-gray-300"></div>
          <div className="mt-2 hidden h-4 w-full rounded bg-gray-300 sm:block"></div>
          <div className="mt-2 hidden h-4 w-full rounded bg-gray-300 sm:block"></div>
          <div className="mt-2 hidden h-4 w-3/4 rounded bg-gray-300 sm:block"></div>
          <div className="flex items-center py-8 text-xs sm:text-sm">
            <span className="h-4 w-12 rounded bg-gray-300"></span>
          </div>
        </div>
        <div className="hidden h-24 rounded bg-gray-300 sm:block sm:w-36">
        </div>
      </div>
    </div>
  );
};

export default ListItemSkeleton;
