
export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Jackle</div>
            <p className="text-slate-400 leading-relaxed">
              Celebrating the artistry in skilled trades, connecting craft with canvas. 
              Where every professional is an artist.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">For Artisans</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Create Portfolio</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Get Featured</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Business Tools</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">For Clients</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Find Artisans</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Book Services</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Reviews & Ratings</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Local Discovery</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Jackle. All rights reserved. Made with ❤️ for skilled artisans everywhere.</p>
        </div>
      </div>
    </footer>
  );
};
