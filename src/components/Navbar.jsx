// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav>
//       <Link to="/">Velvora</Link>
//       <ul >
//         <li><Link to="/" >Home</Link></li>
//         <li><Link to="/cart">Cart</Link></li>
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/register">Register</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// ================================================================
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <nav className="bg-amber-100 shadow-md px-4 py-3 flex justify-between items-center relative">
//       <h2 className="text-2xl font-bold text-blue-600">Velvora</h2>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <ul
//         className={`md:flex md:space-x-6 md:items-center absolute md:static bg-white md:bg-transparent w-full md:w-auto right-0 px-4 md:px-0 transition-all duration-300 ease-in z-50 ${
//           isOpen ? 'top-16 opacity-100' : 'top-[-400px] opacity-0'
//         } md:opacity-100 md:top-0`}
//       >
//         <li className="py-2 md:py-0">
//           <Link to="/" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Home</Link>
//         </li>
//         <li className="py-2 md:py-0">
//           <Link to="/cart" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Cart</Link>
//         </li>
//         <li className="py-2 md:py-0">
//           <Link to="/login" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Login</Link>
//         </li>
//         <li className="py-2 md:py-0">
//           <Link to="/register" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Register</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
// ==================================================================================
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-amber-100 shadow-md px-4 py-3 relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-600">Velvora</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative h-10 ">

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-2xl font-bold text-blue-600">Velvora</h2>
        </div>

        {/* Right side nav */}
        <ul className="absolute right-0 top-0 flex space-x-6 h-full items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
          </li>
          <li>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          </li>
          <li>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </li>
        </ul>
      </div>

      {/* Mobile  */}
      <ul
        className={`md:hidden bg-white mt-2 rounded-md shadow-md transition-all duration-300 ease-in overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >

        {/* items mobile */}
        <li className="py-2 px-4 border-b bg-amber-700">
          <Link to="/" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Home</Link>
        </li>
        <li className="py-2 px-4 border-b">
          <Link to="/cart" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Cart</Link>
        </li>
        <li className="py-2 px-4 border-b">
          <Link to="/login" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Login</Link>
        </li>
        <li className="py-2 px-4">
          <Link to="/register" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
