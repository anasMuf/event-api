import { Hono }                                                                       from 'hono';
import { zValidator }                                                                 from '@hono/zod-validator';
import { createEventSchema, deleteEventSchema, detailEventSchema, updateEventSchema } from '../../modules/events/validation';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent }          from './service'

export const eventsRoute = new Hono();

eventsRoute.get('/', async (c) => {
    const events = await getAllEvents();

    return c.json({ events });
});

eventsRoute.get('/:id', 
    zValidator("param", detailEventSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi

        const event = await getEventById(id);

        return c.json({ event });
    });

eventsRoute.post('/', 
    zValidator("json", createEventSchema), 
    async (c) => {
        const body = c.req.valid("json");

        const newEvent = await createEvent(body);

        return c.json({ event: newEvent }, 201);
    });

eventsRoute.patch('/:id', 
    zValidator("param", detailEventSchema), 
    zValidator("json", updateEventSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi
        const body = c.req.valid("json");

        const updatedEvent = await updateEvent(id, body);

        return c.json({ event: updatedEvent });
    });

eventsRoute.delete('/:id', 
    zValidator("param", deleteEventSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi

        await deleteEvent(id);

        return c.json({ message: "Event deleted successfully" });
    });