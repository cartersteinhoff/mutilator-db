"use client";

import { useEffect, useState } from "react";

interface Stats {
  total: number;
  doctors: number;
  nurses: number;
  mohels: number;
}

export function DatabaseStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    doctors: 0,
    nurses: 0,
    mohels: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/mutilators/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Stats Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Database Statistics</h2>
        <p className="text-muted-foreground">Real-time breakdown of our medical professional network</p>
      </div>

      {/* Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-border rounded-lg p-6 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Doctors</span>
            <span className="text-2xl font-bold text-purple-400">
              {loading ? "..." : stats.doctors}
            </span>
          </div>
          <div className="w-full bg-purple-900/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: loading ? '0%' : `${(stats.doctors / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Nurses</span>
            <span className="text-2xl font-bold text-purple-400">
              {loading ? "..." : stats.nurses}
            </span>
          </div>
          <div className="w-full bg-purple-900/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: loading ? '0%' : `${(stats.nurses / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="border border-border rounded-lg p-6 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Mohels</span>
            <span className="text-2xl font-bold text-purple-400">
              {loading ? "..." : stats.mohels}
            </span>
          </div>
          <div className="w-full bg-purple-900/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: loading ? '0%' : `${(stats.mohels / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}