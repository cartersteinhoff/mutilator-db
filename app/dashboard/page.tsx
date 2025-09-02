"use client";

import { useUser } from "@stackframe/stack";
import { useEffect, useState, useCallback } from "react";
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
  createdBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const user = useUser({ or: "redirect" });
  const [mutilators, setMutilators] = useState<Mutilator[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    doctors: 0,
    nurses: 0,
    mohels: 0,
  });

  const fetchUserMutilators = useCallback(async () => {
    try {
      const response = await fetch(`/api/mutilators/user/${user?.id}`);
      const data = await response.json();
      setMutilators(data.mutilators || []);
      
      // Calculate stats
      const userStats = {
        total: data.mutilators?.length || 0,
        doctors: data.mutilators?.filter((m: Mutilator) => m.type === 'doctor').length || 0,
        nurses: data.mutilators?.filter((m: Mutilator) => m.type === 'nurse').length || 0,
        mohels: data.mutilators?.filter((m: Mutilator) => m.type === 'mohel').length || 0,
      };
      setStats(userStats);
    } catch (error) {
      console.error("Error fetching user mutilators:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      fetchUserMutilators();
    }
  }, [user, fetchUserMutilators]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this mutilator?")) return;
    
    try {
      const response = await fetch(`/api/mutilators/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchUserMutilators();
      }
    } catch (error) {
      console.error("Error deleting mutilator:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.displayName || user?.primaryEmail}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Added</p>
            <p className="text-2xl font-bold text-purple-400">{stats.total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Doctors</p>
            <p className="text-2xl font-bold text-purple-400">{stats.doctors}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Nurses</p>
            <p className="text-2xl font-bold text-purple-400">{stats.nurses}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Mohels</p>
            <p className="text-2xl font-bold text-purple-400">{stats.mohels}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Mutilators</h2>
          <AddMutilatorModal onSuccess={fetchUserMutilators} />
        </div>

        {/* Mutilators List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your mutilators...</p>
          </div>
        ) : mutilators.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground mb-4">You haven&apos;t added any mutilators yet</p>
            <AddMutilatorModal onSuccess={fetchUserMutilators} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mutilators.map((mutilator) => (
              <div
                key={mutilator.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-purple-600/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-purple-900/30 text-purple-300 border border-purple-800/50">
                    {mutilator.type.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(mutilator.id)}
                      className="text-destructive hover:text-destructive/80 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{mutilator.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {mutilator.age} years old • {mutilator.profession}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mutilator.hospital}
                </p>
                
                {mutilator.description && (
                  <p className="text-sm mt-3 text-muted-foreground line-clamp-2">
                    {mutilator.description}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground mt-4">
                  Added {new Date(mutilator.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}