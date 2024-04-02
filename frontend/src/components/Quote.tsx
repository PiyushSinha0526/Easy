const Quote = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      <div className="flex w-[26rem] flex-col">
        <h2 className="text-xl font-bold">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </h2>
        <span className="mt-3 text-base font-bold">Jules Winnfield</span>
        <span className="text-slate-500">CEO, Acme Inc</span>
      </div>
    </div>
  );
};

export default Quote;
