import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import hero2 from "../assets/hero2.jpeg";
import type { Event } from "../types/event";


export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  

 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/events");
      const data: { results: Event[] } = await response.json();
      setEvents(data.results);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero */}
      <div className="h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hero2})` }}>
        
        <div className="absolute inset-0 bg-black/60"></div>

        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 z-20 text-white text-2xl font-bold transition-transform duration-300 transform hover:scale-125 hover:text-black"
        >
          ←
        </button>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-extrabold drop-shadow-xl">Events</h1>
          <p className="text-lg text-gray-200 mt-2">
            Discover upcoming events near you
          </p>
        </div>
      </div>

      {/*Events List */}
      <div className="max-w-7xl mx-auto px-6 py-12" data-theme="dark">
        
        {loading ? (
          <p className="text-center text-xl">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No events available.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
