import { Camera, Sparkles, ChefHat } from 'lucide-react';

const HowToUseSection = () => {
  const steps = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Snap a Photo",
      description: "Take or upload a clear photo of any food item. Our AI performs best with well-lit, focused images.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our advanced AI instantly identifies the dish and analyzes its composition and nutritional content.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Get Insights",
      description: "Receive detailed information about ingredients, nutrition, preparation methods, and cuisine origin.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="mt-16 mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-purple-600/10 blur-3xl -z-10" />
      
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
        How to Use FoodLens AI
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`} />
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden group-hover:border-gray-600/50 transition-all duration-300">
              {/* Icon container with gradient background */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} p-0.5 mb-6 mx-auto`}>
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="text-white">{step.icon}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-center text-gray-100 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-300 text-center leading-relaxed">
                {step.description}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUseSection;