import Link from "next/link";

export default function TripsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Trips Page</h1>
            <p className="text-gray-600 mb-6">This is the trips page content.</p>
            <Link href={"/trips/new"}>
            <button className="bg-[#3a5a40] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d4633] hover:shadow-lg hover:scale-105 transition-all duration-200">
                Add New Trip
            </button>
            </Link>
        </div>
    );
}