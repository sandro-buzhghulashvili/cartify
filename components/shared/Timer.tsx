const Timer: React.FC = () => {
  return (
    <div className="flex items-center gap-5">
      <section className="relative border-[2px] p-2 border-light-blue">
        <p className="text-lg">02</p>
        <span className="text-[8px] absolute -bottom-5 left-0 right-0 mx-auto w-fit">
          DAYS
        </span>
        {/* // time left */}
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-ligher-blue "></div>
      </section>
      <section className="relative border-[2px] p-2 border-light-blue">
        <p className="text-lg">02</p>
        <span className="text-[8px] absolute -bottom-5 left-0 right-0 mx-auto w-fit">
          HOURS
        </span>
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-ligher-blue "></div>
      </section>
      <section className="relative border-[2px] p-2 border-light-blue">
        <p className="text-lg">02</p>
        <span className="text-[8px] absolute -bottom-5 left-0 right-0 mx-auto w-fit">
          MINUTES
        </span>
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-ligher-blue "></div>
      </section>
      <section className="relative border-[2px] p-2 border-light-blue">
        <p className="text-lg">02</p>
        <span className="text-[8px] absolute -bottom-5 left-0 right-0 mx-auto w-fit">
          SECONDS
        </span>
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-ligher-blue "></div>
      </section>
    </div>
  );
};

export default Timer;
