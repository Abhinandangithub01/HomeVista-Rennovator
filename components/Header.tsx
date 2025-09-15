import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 px-4 border-b border-slate-700/50">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          HomeVista Remodeler
        </span>
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        Visualize your dream home renovation with the power of AI.
      </p>
    </header>
  );
};

export default Header;