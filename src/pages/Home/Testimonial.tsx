import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reviewsData } from "@/utils/datas";

const Testimonial = () => {
  return (
    <div className="py-20">
      <h1 className="mb-8 text-[32px] md:text-[40px] font-bold text-center text-primary">
        Customer Testimonials
      </h1>

      <div className="md:container px-16 md:px-[50px]">
        <Carousel
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

                      <p className="text-justify text-gray-700 overflow-y-auto flex-grow">
                        {data.texts}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
