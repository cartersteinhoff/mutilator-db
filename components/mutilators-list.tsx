"use client";

import { useEffect, useState } from "react";

interface Mutilator {
  id: number;
  name: string;
  age: number;
  hospital: string;
  profession: string;
  createdAt: string;
  updatedAt: string;
}

export function MutilatorsList() {
  const [mutilators, setMutilators] = useState<Mutilator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <p className="text-gray-500 mb-4">No mutilators found in the database.</p>
        <p className="text-sm text-gray-400">Add some mutilators to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {mutilators.map((mutilator) => (
          <div
            key={mutilator.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{mutilator.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Age:</span> {mutilator.age}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Hospital:</span> {mutilator.hospital}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Profession:</span> {mutilator.profession}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end text-sm text-gray-500">
                <p>Added: {new Date(mutilator.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}