const FormSkeleton = () => {
  return (
    <div className="mx-auto mt-3 max-w-screen-md animate-pulse px-4">
      <div className="mb-2 h-6 w-24 rounded bg-gray-300"></div>
      <div className="mb-3 h-10 w-full rounded-lg bg-gray-300"></div>
      <div className="mb-2 h-6 w-28 rounded bg-gray-300"></div>
      <div className="mb-3 h-80 w-full rounded-lg bg-gray-300"></div>
      <div className="h-10 w-24 rounded-lg bg-gray-300"></div>
    </div>
  );
};

export default FormSkeleton;
