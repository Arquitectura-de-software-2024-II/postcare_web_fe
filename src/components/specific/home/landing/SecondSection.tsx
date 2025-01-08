import Carousel from "@/components/UI/carousel";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SecondSection() {
  const imageUrls = [
    "/carousel/carouselImage1.jpg",
    "/carousel/carouselImage2.jpg",
    "/carousel/carouselImage3.jpg",
    "/carousel/carouselImage4.png",
  ];

  return (
    <div className="bg-primaryColor text-backgroundColor p-0 w-full">
      <section className="max-w-screen-xl mx-auto xl:gap-0 pb-14 mt-16 lg:mt-0">
        <div className="w-full flex justify-center">
          <FontAwesomeIcon
            icon={faAngleDown}
            className="text-primaryColor text-3xl animate-bounce h-16 w-16 relative -top-16"
          />
        </div>
        <Carousel images={imageUrls} />
      </section>
    </div>
  );
}
