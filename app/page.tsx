import { AddMutilatorModal } from "@/components/add-mutilator-modal";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mutilator Database</h1>
        <div className="flex gap-4 mb-8">
          <AddMutilatorModal />
        </div>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Click "Add a Mutilator" to add a new entry to the database.
          </p>
        </div>
      </main>
    </div>
  );
}