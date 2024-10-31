import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { reviewsData } from "@/utils/datas";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ bounce: 0.5, duration: 1 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="px-4">
        <h1 className="text-[28px] md:text-[36px] font-medium text-center">
          Customer Testimonials
        </h1>
        <div className="mt-4 mb-8 bg-primary h-[1px] w-full md:w-[500px] mx-auto" />
      </div>
      <div className="md:container px-16 md:px-[50px]">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {reviewsData.map((data, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <Card className="h-full border-0 shadow-md">
                    <CardContent className="flex flex-col p-6 h-full">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 flex-shrink-0 border-2 border-secondary">
                          <img
                            src={data.userImg}
                            alt={data.userName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mb-3">
                          <p className="text-lg font-semibold flex-shrink-0">
                            {data.userName}
                          </p>
                          <p className="text-sm text-gray-500 flex-shrink-0">
                            {data.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-justify overflow-y-auto flex-grow">
                        {data.texts}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-2 border-primary text-primary " />
          <CarouselNext className="border-2 border-primary text-primary" />
        </Carousel>
      </div>
    </motion.div>
  );
};

export default Testimonial;
