"use client"

import { createTrip } from "@/lib/actions/create-trip";
import { useTransition } from "react";

export default function NewTripPage() {

    const [isPending, startTransition] = useTransition();
    
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Create New Trip</h1>
                
                <form  className="bg-white rounded-lg shadow-lg p-8" 
                    action={(formData: FormData) => {
                        startTransition(() => {
                            createTrip(formData)
                        })
                    }}
                >
                    <div className="space-y-6 text-gray-700">
                        {/* Trip Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Trip Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"

                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent"
                                placeholder="Enter trip title"
                                required
                            />
                        </div>

                        

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"

                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
     
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:border-transparent resize-none"
                                placeholder="Describe your trip..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#3a5a40] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d4633] hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            {isPending ? "creating your trip.." : "create trip"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}