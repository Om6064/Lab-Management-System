import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // icon library (comes with shadcn/lucide)

const BackToDashboard = () => {
  return (
    <div className="mb-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default BackToDashboard;
