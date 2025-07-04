import { auth } from "@/auth";
import TripDetailsPageClient from "@/components/TripDetailsPageClient";
import { prisma } from "@/lib/prisma";

export default async function TripDetailsPage({params}: {params: Promise<{tripId: string}>}) {
    const {tripId} = await params;
        const session = await auth();

    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-3-9a3 3 0 016 0m6 0a3 3 0 11-6 0m6 0v7a2 2 0 01-2 2H9a2 2 0 01-2-2v-7"/>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                        <p className="text-gray-600">You must be signed in to view this trip.</p>
                    </div>
                </div>
            </div>
        );
    }

    const trip = await prisma.trip.findFirst({
        where: {
            id: tripId
        }
    })
    if (!trip) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h1>
                    <p className="text-gray-600">The trip you are looking for does not exist.</p>
                </div>
            </div>
        );
    }
    
    return (
        <TripDetailsPageClient trip={trip} />
    )
}
