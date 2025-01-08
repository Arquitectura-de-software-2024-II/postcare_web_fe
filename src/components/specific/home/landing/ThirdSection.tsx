import Button from "@/components/UI/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ThirdSection() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8">
        <div className="bg-backgroundColor-90 border-gray-200 rounded-lg p-8 md:p-12 mb-8">
        <FontAwesomeIcon icon={faArrowRight} className="w-10 h-10"/>
          <h3 className="mb-2 text-primaryColor">How to quickly deploy a static website</h3>
          <p className="text-lg font-normal text-gray-500 mb-6">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <Button
            label="Leer más"
            size="xl"
            rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-backgroundColor-90 border-gray-200  rounded-lg p-8 md:p-12">
            <h3 className="mb-2 text-primaryColor">Start with Flowbite Design System</h3>
            <p className="text-lg font-normal text-gray-500 mb-4">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers.
            </p>
            <Button
              label="Registrate aquí"
              navigate="/auth/login"
              size="xl"
              additionalClasses="inline-flex items-center justify-center"
              outlined={true}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </div>
          <div className="bg-backgroundColor-90 border-gray-200 rounded-lg p-8 md:p-12">
            <h3 className="mb-2 text-primaryColor">Best react libraries around the web</h3>
            <p className="text-lg font-normal text-gray-500 mb-4">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers.
            </p>
            <Button
              label="Registrate aquí"
              navigate="/auth/login"
              size="xl"
              additionalClasses="inline-flex items-center justify-center"
              outlined={true}
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
