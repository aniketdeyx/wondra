import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();
    const trips = await prisma.trip.findMany({
        where: {
            userId: session?.user?.id, // Ensure we only fetch trips for the logged-in user
        }
    });
    const sortedTrips = [...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const upcomingTrips = sortedTrips.filter((trip) => new Date(trip.startDate) >= today);
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
                        <p className="text-gray-600">You must be signed in to view your trips.</p>
                    </div>
                    <Link href={"/"}>
                        <button className="w-full bg-[#3a5a40] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d4633] hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                            Go to Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
                            <p className="text-gray-600 mt-1">
                                {session?.user?.name ? `Welcome back, ${session.user.name}!` : 'Welcome back!'}
                            </p>
                        </div>
                        <Link href={"/trips/new"}>
                            <button className="inline-flex items-center px-6 py-3 bg-[#3a5a40] text-white font-medium rounded-lg shadow-sm hover:bg-[#2d4633] hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a5a40]">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Trip
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {trips.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No trips yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Start planning your next adventure! Create your first trip to organize your travel plans and memories.
                        </p>
                        <Link href={"/trips/new"}>
                            <button className="inline-flex items-center px-8 py-3 bg-[#3a5a40] text-white font-medium rounded-lg shadow-sm hover:bg-[#2d4633] hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a5a40]">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Your First Trip
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* Trips List */
                    <div>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                You have {trips.length} planned {trips.length > 1 ? 'trips' : 'trip'}.
                                {upcomingTrips.length > 0 ? `Upcoming trips: ${upcomingTrips.length} upcoming` : ""}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <div key={trip.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.title}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {trip.startDate && trip.endDate ? (
                                                `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}`
                                            ) : (
                                                'Dates not set'
                                            )}
                                        </div>
                                        {trip.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{trip.description}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Planning
                                            </span>
                                            <Link href={`/trips/${trip.id}`}>
                                                <button className="text-[#3a5a40] hover:text-[#2d4633] font-medium text-sm">
                                                    View Details →
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}