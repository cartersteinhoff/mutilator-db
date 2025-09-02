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

export function FeaturedMutilator() {
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
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-purple-600/20 rounded-3xl blur-3xl"></div>
        
        {/* Main hero card skeleton */}
        <div className="relative bg-gradient-to-br from-purple-950/40 via-purple-900/30 to-purple-950/40 backdrop-blur-xl rounded-3xl border border-purple-800/30 overflow-hidden">
          <div className="relative z-10">
            {/* Top banner skeleton */}
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-600/10 px-8 py-3 border-b border-purple-800/30">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur border border-purple-400/30 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-purple-400/30 mr-2"></div>
                  <div className="h-3 w-32 bg-purple-400/30 rounded"></div>
                </div>
                <div className="h-3 w-24 bg-purple-300/20 rounded animate-pulse hidden sm:block"></div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              {/* First row skeleton - Image and Info Cards */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                {/* Image skeleton */}
                <div className="mx-auto lg:mx-0">
                  <div className="relative w-48 h-48 lg:w-[200px] lg:h-[200px] rounded-2xl bg-purple-800/30 border-2 border-purple-500/30 animate-pulse">
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="h-7 w-20 bg-purple-900/50 rounded-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Info cards skeleton */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-1 lg:max-w-sm">
                  <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-800/30 flex-1 animate-pulse">
                    <div className="h-3 w-16 bg-purple-400/30 rounded mb-2"></div>
                    <div className="h-5 w-full bg-purple-800/30 rounded"></div>
                  </div>
                  <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-800/30 flex-1 animate-pulse">
                    <div className="h-3 w-24 bg-purple-400/30 rounded mb-2"></div>
                    <div className="h-5 w-full bg-purple-800/30 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Second row skeleton - Name */}
              <div className="mb-6">
                <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                  <span className="block h-12 lg:h-14 w-3/4 bg-purple-800/30 rounded-lg animate-pulse"></span>
                </h2>
                <p className="text-lg">
                  <span className="inline-block h-7 w-80 bg-purple-800/30 rounded animate-pulse"></span>
                </p>
              </div>

              {/* Third row skeleton - Description */}
              <div className="mb-8 animate-pulse">
                <div className="h-20 w-full bg-purple-800/30 rounded"></div>
              </div>

              {/* CTA skeleton */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="h-11 w-44 bg-purple-800/30 rounded-md animate-pulse"></div>
                <div className="h-11 w-44 bg-purple-800/30 rounded-md animate-pulse"></div>
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-purple-600/20 rounded-3xl blur-3xl"></div>
      
      {/* Main hero card */}
      <div className="relative bg-gradient-to-br from-purple-950/40 via-purple-900/30 to-purple-950/40 backdrop-blur-xl rounded-3xl border border-purple-800/30 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Top banner with featured badge */}
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-600/10 px-8 py-3 border-b border-purple-800/30">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur border border-purple-400/30">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                </span>
                <span className="text-sm font-medium text-purple-200">Featured This Week</span>
              </div>
              <span className="text-xs text-purple-300/60 hidden sm:block">
                Refreshes weekly
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Three column layout on desktop */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Column 1: Image */}
              {featured.imageUrl && (
                <div className="mx-auto lg:mx-0 flex-shrink-0">
                  <div className="relative w-48 h-48 lg:w-[200px] lg:h-[200px] rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                    {/* Type badge overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-purple-900/80 backdrop-blur text-purple-100 border border-purple-500/50">
                        {featured.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Column 2: Name and age/profession */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
                  {featured.name}
                </h2>
                <p className="text-purple-300 text-lg">
                  {featured.age} years old • {featured.profession}
                </p>
              </div>

              {/* Column 3: Info cards */}
              <div className="flex flex-col gap-4 lg:w-64 flex-shrink-0">
                <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-800/30">
                  <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Hospital</p>
                  <p className="text-purple-100 font-medium">{featured.hospital}</p>
                </div>
                <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-800/30">
                  <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Specialization</p>
                  <p className="text-purple-100 font-medium">{featured.profession}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {featured.description && (
              <p className="text-purple-200/80 mb-8 leading-relaxed">
                {featured.description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
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
  );
}