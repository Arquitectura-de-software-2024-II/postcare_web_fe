import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TimelineItemProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

// components/TimelineItem.js

const TimelineItem: React.FC<TimelineItemProps> = ({
  title = "",
  subtitle = "",
  description = "",
}) => {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-primaryColor-10 rounded-full -start-3 ring-8 ring-backgroundColor-90">
        <FontAwesomeIcon
          icon={faCalendarDay}
          className="w-2.5 h-2.5 text-primaryColor"
        />
      </span>
      <h3 className="mb-1 text-lg font-semibold text-primaryColor">{title}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-textColor-40 ">
        {subtitle}
      </time>
      <p className="text-base font-normal text-textColor-50">{description}</p>
    </li>
  );
};

export default TimelineItem;
