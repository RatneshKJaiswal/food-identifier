import { useState } from 'react'; 
import { 
  Menu, 
  X, 
  Aperture, 
  Scan, 
  Apple, 
  UtensilsCrossed, 
  Sparkles, 
  Eye 
} from 'lucide-react';

const LogoVariants = {
  Modern: () => (
    <div className="relative">
      <Aperture className="w-8 h-8 text-blue-400" />
      <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
    </div>
  ),
  Foodie: () => (
    <div className="relative">
      <UtensilsCrossed className="w-8 h-8 text-blue-400" />
      <Eye className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
    </div>
  ),
  Fresh: () => (
    <div className="relative">
      <Apple className="w-8 h-8 text-blue-400" />
      <Scan className="w-4 h-4 text-purple-400 absolute -bottom-1 -right-1" />
    </div>
  )
};

const Navbar = ({ scrollToHeader, scrollToFeatures, scrollToFooter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedLogo = LogoVariants.Foodie;

  return (
    <nav className="relative bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="#" onClick={scrollToHeader} className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-2 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <SelectedLogo />
              </div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                FoodLens AI
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a onClick={scrollToHeader} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
              Home
            </a>
            <a onClick={scrollToFeatures} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
              Features
            </a>
            <a onClick={scrollToFooter} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
              About
            </a>
            <a onClick={scrollToFooter} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
              Contact
            </a>
            <a onClick={scrollToFooter} className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
              Blog
            </a>
            <button className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Features', 'About', 'Contact', 'Blog'].map((item) => (
                <a key={item} onClick={() => {
                  setIsOpen(false);
                  if (item === 'Home') scrollToHeader();
                  if (item === 'Features') scrollToFeatures();
                  if (['About', 'Contact', 'Blog'].includes(item)) scrollToFooter();
                }} className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
                  {item}
                </a>
              ))}
              <button className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
