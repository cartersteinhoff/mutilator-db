import { MutilatorsList } from "@/components/mutilators-list";
import { AddMutilatorModal } from "@/components/add-mutilator-modal";

export default function MutilatorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">All Mutilators</h1>
            <AddMutilatorModal />
          </div>
        </div>
        
        <MutilatorsList />
      </div>
    </div>
  );
}