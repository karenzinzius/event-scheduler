import type { Event } from "../types/event";
import { Link } from "react-router-dom";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-700 mb-2">{event.description}</p>
        <p className="text-gray-500 mb-1">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500">{event.location}</p>
      </div>
    </Link>
  );
}

