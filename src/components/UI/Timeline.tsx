import { TimelineItemProps } from "./TimelineItem";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
  items: TimelineItemProps[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  // components/Timeline.js
  return (
    <ol className="relative border-s border-grayColor-20">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
        />
      ))}
    </ol>
  );
};

export default Timeline;
