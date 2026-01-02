import { prisma } from '../../utils/prisma';

type EventData = {
    name: string;
    description: string;
    dateTime: string;
    location: string;
}

type EventUpdateData = {
    name?: string | undefined;
    description?: string | undefined;
    dateTime?: string | undefined;
    location?: string | undefined;
};

async function getAllEvents() {
    const events = await prisma.event.findMany({
        include: { participants: true },
    });
    
    return events;
}

async function getEventById(id: string) {
    const event = await prisma.event.findFirst({
        where: { id: id },
        include: { participants: true },
    });

    return event;
}

async function createEvent(body: EventData) {
    const newEvent = await prisma.event.create({
        data: {
            name: body.name,
            description: body.description,
            dateTime: body.dateTime,
            location: body.location
        },
    })

    return newEvent;
}

async function updateEvent(id: string, body: EventUpdateData) {
    const updatedEvent = await prisma.event.update({
        where: { id: id },
        data: {
            name: body.name,
            description: body.description,
            dateTime: body.dateTime,
            location: body.location
        },
    })

    return updatedEvent;
}

async function deleteEvent(id: string) {
    return await prisma.event.delete({
        where: { id: id },
    });
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
