export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
};
