import z from 'zod';

export const detailParticipantSchema = z.object({
    id: z.cuid(),
});

export const createParticipantSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    eventId: z.string().cuid(),
});

export const updateParticipantSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.email().min(1).optional(),
    eventId: z.cuid().optional(),
});

export const deleteParticipantSchema = z.object({
    id: z.cuid(),
});