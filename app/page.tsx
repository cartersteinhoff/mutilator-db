import { AddMutilatorModal } from "@/components/add-mutilator-modal";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mutilator Database</h1>
        <div className="flex gap-4 mb-8">
          <AddMutilatorModal />
          <Link 
            href="/mutilators"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            View All Mutilators
          </Link>
        </div>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Click &quot;Add a Mutilator&quot; to add a new entry to the database or &quot;View All Mutilators&quot; to see the list.
          </p>
        </div>
      </main>
    </div>
  );
}