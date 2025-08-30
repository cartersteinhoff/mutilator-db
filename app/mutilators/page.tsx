import { MutilatorsList } from "@/components/mutilators-list";
import { AddMutilatorModal } from "@/components/add-mutilator-modal";
import Link from "next/link";

export default function MutilatorsPage() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-500 hover:text-blue-600 text-sm mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">All Mutilators</h1>
            <AddMutilatorModal />
          </div>
        </div>
        
        <MutilatorsList />
      </main>
    </div>
  );
}