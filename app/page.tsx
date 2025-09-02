import { FeaturedMutilatorAlt } from "@/components/featured-mutilator-alt";
import { DatabaseStats } from "@/components/database-stats";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Design - Split Screen */}
        <FeaturedMutilatorAlt />

        <DatabaseStats />

        {/* Features Section */}
        <div className="border border-border rounded-lg p-8 bg-card">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Real-time search across all mutilator records
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Filter by type: Doctors, Nurses, and Mohels
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              Image uploads with Vercel Blob Storage
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">✓</span>
              PostgreSQL database with Neon serverless
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}