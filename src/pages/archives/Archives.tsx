import { Construction } from 'lucide-react';

const Archives = () => {
  return (
    <div className="min-h-[75vh] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Construction className="mx-auto h-24 w-24 text-blue-900 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Under Construction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're currently working on digitizing and organizing our chapter's historical archives. 
            Check back soon to explore our rich history and traditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archives;
