export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">José García</p>
            <p className="text-gray-400">Programador Multiplataforma</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              LinkedIn
            </a>
            <a href="mailto:jose@josegc.dev" className="hover:text-blue-400 transition">
              Email
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 josegc.dev - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
