import { Hono }                                                                                               from 'hono';
import { zValidator }                                                                                         from '@hono/zod-validator';
import { createParticipantSchema, deleteParticipantSchema, detailParticipantSchema, updateParticipantSchema } from '../../modules/participants/validation';
import { createParticipant, deleteParticipant, getAllParticipants, getParticipantById, updateParticipant }    from './service'

export const participantsRoute = new Hono();

participantsRoute.get('/', async (c) => {
    const participants = await getAllParticipants();

    return c.json({ participants });
});

participantsRoute.get('/:id', 
    zValidator("param", detailParticipantSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi

        const participant = await getParticipantById(id);

        return c.json({ participant });
    });

participantsRoute.post('/', 
    zValidator("json", createParticipantSchema), 
    async (c) => {
        const body = c.req.valid("json");

        const newParticipant = await createParticipant(body);

        return c.json({ participant: newParticipant }, 201);
    });

participantsRoute.patch('/:id', 
    zValidator("param", detailParticipantSchema), 
    zValidator("json", updateParticipantSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi
        const body = c.req.valid("json");

        const updatedParticipant = await updateParticipant(id, body);

        return c.json({ participant: updatedParticipant });
    });

participantsRoute.delete('/:id', 
    zValidator("param", deleteParticipantSchema), 
    async (c) => {
        const id = c.req.valid("param").id;// ambil property objek dari validasi

        await deleteParticipant(id);

        return c.json({ message: "Participant deleted successfully" });
    });