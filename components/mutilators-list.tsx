"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

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

export function MutilatorsList() {
  const [mutilators, setMutilators] = useState<Mutilator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "doctor" | "nurse" | "mohel">("all");

  // Filter mutilators based on search query and type
  const filteredMutilators = useMemo(() => {
    let filtered = mutilators;
    
    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter(mutilator => mutilator.type === typeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mutilator => 
        mutilator.name.toLowerCase().includes(query) ||
        mutilator.hospital.toLowerCase().includes(query) ||
        mutilator.profession.toLowerCase().includes(query) ||
        mutilator.type.toLowerCase().includes(query) ||
        (mutilator.description && mutilator.description.toLowerCase().includes(query)) ||
        mutilator.age.toString().includes(query)
      );
    }
    
    return filtered;
  }, [mutilators, searchQuery, typeFilter]);

  useEffect(() => {
    fetchMutilators();
  }, []);

  const fetchMutilators = async () => {
    try {
      const response = await fetch("/api/mutilators");
      if (!response.ok) {
        throw new Error("Failed to fetch mutilators");
      }
      const data = await response.json();
      setMutilators(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading mutilators...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (mutilators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-muted-foreground mb-4">No mutilators found in the database.</p>
        <p className="text-sm text-muted-foreground/70">Add some mutilators to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Type Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setTypeFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            typeFilter === "all"
              ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({mutilators.length})
        </button>
        <button
          onClick={() => setTypeFilter("doctor")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            typeFilter === "doctor"
              ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Doctors ({mutilators.filter(m => m.type === "doctor").length})
        </button>
        <button
          onClick={() => setTypeFilter("nurse")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            typeFilter === "nurse"
              ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Nurses ({mutilators.filter(m => m.type === "nurse").length})
        </button>
        <button
          onClick={() => setTypeFilter("mohel")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            typeFilter === "mohel"
              ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Mohels ({mutilators.filter(m => m.type === "mohel").length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Input
          type="text"
          placeholder="Search mutilators by name, hospital, profession, type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-card border-border"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-muted-foreground hover:text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Results Count */}
      {(searchQuery || typeFilter !== "all") && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredMutilators.length} {filteredMutilators.length === 1 ? 'mutilator' : 'mutilators'}
          {searchQuery && ` matching "${searchQuery}"`}
          {typeFilter !== "all" && ` (${typeFilter}s only)`}
        </div>
      )}

      {/* Mutilators Grid */}
      <div className="grid gap-4">
        {filteredMutilators.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center border border-border rounded-lg p-8">
            <svg
              className="h-12 w-12 text-muted-foreground mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-muted-foreground mb-2">No results found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search query</p>
          </div>
        ) : (
          filteredMutilators.map((mutilator) => (
          <div
            key={mutilator.id}
            className="border border-border rounded-lg p-6 hover:shadow-lg hover:border-purple-800/30 transition-all bg-card cursor-pointer"
          >
            <div className="flex gap-6">
              {mutilator.imageUrl && (
                <div className="flex-shrink-0 relative w-24 h-24">
                  <Image
                    src={mutilator.imageUrl}
                    alt={mutilator.name}
                    fill
                    className="rounded-lg object-cover border border-border"
                  />
                </div>
              )}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{mutilator.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Type:</span>{' '}
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900/20 text-purple-300 border border-purple-800/30">
                          {mutilator.type.charAt(0).toUpperCase() + mutilator.type.slice(1)}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Age:</span> {mutilator.age}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Hospital:</span> {mutilator.hospital}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Profession:</span> {mutilator.profession}
                      </p>
                      {mutilator.description && (
                        <p className="text-muted-foreground mt-2">
                          <span className="font-medium">Description:</span> {mutilator.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-end text-sm text-muted-foreground">
                    <p>Added: {new Date(mutilator.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}