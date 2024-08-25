import { Steps } from "@/utils/datas";




const HowItWorks = () => {
  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-[32px] md:text-[40px] font-bold text-center text-primary ">
          How It Works
        </h2>
        <p className="mb-20 text-center text-xl text-gray-600">
          Follow these simple steps to book your room effortlessly.
        </p>
        <div className="relative">
          <div className="mt-6 flex flex-col lg:flex-row justify-between items-center space-y-16 lg:space-y-0">
            {Steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full lg:w-1/3 relative"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-center text-gray-600 max-w-xs">
                  {step.description}
                </p>

                {/* Step number */}

                <div className="py-2 pe-2 border-b-2 border-secondary flex items-center gap-2 absolute top-0 left-0 mr-3 -mt-10 ">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-primary text-lg font-semibold">
                    Step-{index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
