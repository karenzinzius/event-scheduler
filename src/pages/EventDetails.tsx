import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import type { Event } from "../types/event";
import { apiFetch } from "../api/apiFetch";
import EventCard from "../components/EventCard";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mine = searchParams.get("mine") === "true";

  const [event, setEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (mine) {
          const data: { results: Event[] } = await apiFetch<{ results: Event[] }>("/events?mine=true");
          setEvents(data.results);
        } else if (id) {
          const data = await apiFetch<Event>(`/events/${id}`);
          setEvent(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load event(s).");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, mine]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-error">{error}</p>;

  if (mine) {
    if (events.length === 0)
      return <p className="p-4 text-center text-gray-400">You have no events.</p>;

    return (
      <div className="p-6" data-theme="dark">
        <div className="max-w-7xl mx-auto mt-10 px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="card bg-base-100 shadow hover:shadow-xl cursor-pointer transform transition duration-300 hover:-translate-y-2"
              onClick={() => navigate(`/events/${e.id}`)}
            >
              <EventCard event={e} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!event) return <p className="p-4">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded relative" data-theme="dark">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 text-gray-300 text-2xl font-bold transition-transform duration-300 transform hover:scale-125 hover:text-white"
      >
        ←
      </button>

      <div className="card bg-base-100 shadow p-6 rounded">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

        <p className="text-gray-200 mb-2">
          📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>

        <p className="text-gray-200 mb-2">
          📍 <strong>Location:</strong> {event.location}
        </p>

        <p className="text-gray-200 mb-2">
          🗺️ <strong>Coordinates:</strong> {event.latitude}, {event.longitude}
        </p>

        <p className="text-gray-300 mt-4 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
