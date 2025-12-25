import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            josegc.dev
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Proyectos
            </Link>
            <Link to="/challenges" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Challenges
            </Link>
            <Link to="/visual-thinking" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Visual Thinking
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
