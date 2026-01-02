import z from 'zod';

export const detailEventSchema = z.object({
    id: z.cuid(),
});

export const createEventSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    dateTime: z.string().min(1),
    location: z.string().min(1),
});

export const updateEventSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    dateTime: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
});

export const deleteEventSchema = z.object({
    id: z.cuid(),
});