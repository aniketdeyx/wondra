"use server"

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(formData: FormData) {

    const session = await auth();
    if(!session || !session.user?.id) {
        throw new Error('Unauthorized');
    }
    
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string | null;
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const description = formData.get('description') as string;

    if(!title || !startDateStr || !endDateStr || !description ) {
        throw new Error('All fields are required');
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    await prisma.trip.create({
        data: {
            title,
            startDate,
            endDate,
            userId: session.user.id,
            description,
            imageUrl: imageUrl || null

        }
    })
    redirect('/trips');
}