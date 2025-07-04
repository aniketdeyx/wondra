"use client"

import { Trip } from '@/app/generated/prisma'
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  MapPin, 
  Edit3, 
  Share2, 
  Heart, 
  Clock, 
  Users,
  Camera,
  FileText,
  ArrowLeft,
  Download,
  Star
} from 'lucide-react'

const TripDetailsPageClient = ({trip}:{trip: Trip}) => {
  const [isLiked, setIsLiked] = useState(false)

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDuration = () => {
    if (!trip.startDate || !trip.endDate) return null;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeUntilTrip = () => {
    if (!trip.startDate) return null;
    const today = new Date();
    const tripStart = new Date(trip.startDate);
    const diffTime = tripStart.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Trip has passed";
    if (diffDays === 0) return "Trip starts today!";
    if (diffDays === 1) return "Trip starts tomorrow";
    return `${diffDays} days until trip`;
  };

  const duration = getDuration();
  const timeUntilTrip = getTimeUntilTrip();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/trips" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Trips</span>
            </Link>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <Link href={`/trips/${trip.id}/edit`}>
                <button className="inline-flex items-center px-4 py-2 bg-[#3a5a40] text-white rounded-lg hover:bg-[#2d4633] transition-colors">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Trip
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-80 bg-gradient-to-br from-blue-100 via-green-50 to-emerald-100 flex items-center justify-center">
          {trip.imageUrl ? (
            <img 
              src={trip.imageUrl} 
              alt={trip.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-gray-600 font-medium">No image uploaded</p>
            </div>
          )}
        </div>
        
        {/* Trip Status Badge */}
        <div className="absolute top-6 left-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
            timeUntilTrip?.includes('passed') 
              ? 'bg-gray-100 text-gray-800' 
              : timeUntilTrip?.includes('today') 
              ? 'bg-orange-100 text-orange-800'
              : 'bg-green-100 text-green-800'
          }`}>
            <Clock className="w-4 h-4 mr-2" />
            {timeUntilTrip}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Trip Title & Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                    <span className="font-medium">Dream Destination</span>
                  </div>
                </div>
              </div>

              {trip.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{trip.description}</p>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-900">Duration</p>
                  <p className="text-lg font-bold text-blue-800">
                    {duration ? `${duration} ${duration === 1 ? 'day' : 'days'}` : 'TBD'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-900">Travelers</p>
                  <p className="text-lg font-bold text-green-800">Solo Trip</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Camera className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-900">Memories</p>
                  <p className="text-lg font-bold text-purple-800">0 Photos</p>
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Itinerary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="font-medium">No itinerary yet</p>
                    <p className="text-sm">Add activities and plans for your trip</p>
                    <button className="mt-4 px-4 py-2 bg-[#3a5a40] text-white rounded-lg hover:bg-[#2d4633] transition-colors">
                      Add Activities
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Photos & Memories</h3>
                <button className="text-[#3a5a40] hover:text-[#2d4633] font-medium text-sm">
                  Upload Photos
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Trip Info */}
          <div className="space-y-6">
            
            {/* Date Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Trip Dates
              </h3>
              <div className="space-y-4">
                {trip.startDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="text-gray-900 mt-1">{formatDate(trip.startDate)}</p>
                  </div>
                )}
                {trip.endDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="text-gray-900 mt-1">{formatDate(trip.endDate)}</p>
                  </div>
                )}
                {!trip.startDate && !trip.endDate && (
                  <p className="text-gray-500 italic">Dates not set</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900">Export Trip</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900">Share Trip</span>
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Users className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900">Invite Friends</span>
                </button>
              </div>
            </div>

            {/* Trip Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {new Date(trip.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Planning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetailsPageClient