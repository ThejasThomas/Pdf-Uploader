
import { UploadForm } from "../components/UploadForm";
import { Zap, Shield, Clock } from "lucide-react";

export const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process your PDFs instantly with our optimized extraction engine",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents are encrypted and processed with enterprise-grade security",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Extract text and data from multiple PDFs in seconds, not hours",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Main Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Your PDF
            </h2>
            <p className="text-gray-600">
              Start by uploading your PDF file. Our advanced extraction system will
              process it and make your data accessible in seconds.
            </p>
          </div>

          <UploadForm />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8">
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How It Works
          </h3>
          <ol className="space-y-3">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <span className="text-gray-700">
                <strong>Upload</strong> your PDF file using the upload area above
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <span className="text-gray-700">
                <strong>Processing</strong> begins automatically with our extraction engine
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <span className="text-gray-700">
                <strong>Access</strong> your extracted data from the "View PDFs" section
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
