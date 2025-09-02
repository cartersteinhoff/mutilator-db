"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AddMutilatorModal } from "@/components/add-mutilator-modal";

interface Mutilator {
  id: number;
  name: string;
  age: number;
  hospital: string;
  profession: string;
  type: 'doctor' | 'nurse' | 'mohel';
  description?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export function FeaturedMutilatorAlt() {
  const [featured, setFeatured] = useState<Mutilator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const response = await fetch("/api/mutilators/featured");
      const data = await response.json();
      setFeatured(data.featured);
    } catch (error) {
      console.error("Error fetching featured mutilator:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative mb-12">
        {/* Split screen skeleton */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-800/30">
          <div className="grid lg:grid-cols-2">
            {/* Left side - Image skeleton */}
            <div className="relative h-[400px] lg:h-[500px] bg-purple-950/40 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-900/20"></div>
            </div>
            
            {/* Right side - Content skeleton */}
            <div className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="h-4 w-32 bg-purple-800/30 rounded animate-pulse"></div>
                <div className="h-12 w-3/4 bg-purple-800/30 rounded animate-pulse"></div>
                <div className="h-6 w-1/2 bg-purple-800/30 rounded animate-pulse"></div>
                <div className="h-20 w-full bg-purple-800/30 rounded animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-24 bg-purple-800/30 rounded-xl animate-pulse"></div>
                  <div className="h-24 bg-purple-800/30 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <div className="h-12 w-40 bg-purple-800/30 rounded-md animate-pulse"></div>
                  <div className="h-12 w-40 bg-purple-800/30 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!featured) {
    return null;
  }

  return (
    <div className="relative mb-12">
      {/* Split screen design */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-800/30 shadow-2xl shadow-purple-900/50">
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-transparent to-purple-600 animate-pulse"></div>
        </div>

        <div className="relative grid lg:grid-cols-2">
          {/* Left side - Full height image */}
          <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-purple-950 to-purple-900">
            {featured.imageUrl ? (
              <>
                <Image
                  src={featured.imageUrl}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-900/20 to-transparent"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 flex items-center justify-center">
                <div className="text-6xl text-purple-400/30">👤</div>
              </div>
            )}
            
            {/* Floating badge in corner */}
            <div className="absolute top-6 left-6">
              <div className="bg-purple-950/90 backdrop-blur-xl rounded-2xl px-4 py-2 border border-purple-500/30">
                <p className="text-xs text-purple-300 uppercase tracking-wider">Featured Professional</p>
                <p className="text-sm font-bold text-purple-100 mt-0.5">{featured.type.toUpperCase()}</p>
              </div>
            </div>

            {/* Week indicator */}
            <div className="absolute bottom-6 left-6">
              <div className="inline-flex items-center gap-2 bg-purple-950/90 backdrop-blur-xl rounded-full px-4 py-2 border border-purple-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                </span>
                <span className="text-sm text-purple-200">This Week&apos;s Featured Mutilator</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Small label */}
              <div className="text-sm font-medium text-purple-400 uppercase tracking-wider">
                Mutilator Spotlight
              </div>
              
              {/* Name */}
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                {featured.name}
              </h2>
              
              {/* Age and profession */}
              <p className="text-xl text-purple-200">
                {featured.age} years old • {featured.profession}
              </p>
              
              {/* Description */}
              {featured.description && (
                <p className="text-purple-100/80 leading-relaxed">
                  {featured.description}
                </p>
              )}
              
              {/* Info cards in a grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-800/50">
                  <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Hospital</p>
                  <p className="text-purple-100 font-medium text-sm">{featured.hospital}</p>
                </div>
                <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-800/50">
                  <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Specialization</p>
                  <p className="text-purple-100 font-medium text-sm">{featured.profession}</p>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <AddMutilatorModal />
                <Link href="/mutilators">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-purple-950/50 border-purple-600/50 hover:bg-purple-900/50 hover:border-purple-500/50 text-purple-100"
                  >
                    View All Mutilators
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}