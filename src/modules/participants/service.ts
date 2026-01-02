import { prisma } from '../../utils/prisma';

type ParticipantData = {
    name: string;
    email: string;
    eventId: string;
}

type ParticipantUpdateData = {
    name?: string | undefined;
    email?: string | undefined;
    eventId?: string | undefined;
};

async function getAllParticipants() {
    const events = await prisma.event.findMany({
        include: { participants: true },
    });
    
    return events;
}

async function getParticipantById(id: string) {
    const event = await prisma.event.findFirst({
        where: { id: id },
        include: { participants: true },
    });

    return event;
}

async function createParticipant(body: ParticipantData) {
    const newParticipant = await prisma.participant.create({
        data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId
        },
    })

    return newParticipant;
}

async function updateParticipant(id: string, body: ParticipantUpdateData) {
    const updatedParticipant = await prisma.participant.update({
        where: { id: id },
        data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId
        },
    })

    return updatedParticipant;
}

async function deleteParticipant(id: string) {
    return await prisma.participant.delete({
        where: { id: id },
    });
}

export {
    getAllParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
    deleteParticipant
};
