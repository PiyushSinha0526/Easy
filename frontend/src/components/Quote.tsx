const Quote = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-[26rem] flex-col rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold leading-relaxed text-gray-800">
          "Writing is a journey, and sharing your thoughts with the world is
          just the beginning. This platform has empowered me to express my ideas
          freely and connect with readers globally."
        </h2>
        <span className="mt-4 text-base font-semibold text-gray-700">
          Hinata Arisawa
        </span>
        <span className="text-sm text-gray-500">Blogger & Content Creator</span>
      </div>
    </div>
  );
};

export default Quote;
