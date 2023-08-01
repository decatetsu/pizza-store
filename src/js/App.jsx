import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Home, Cart } from './pages';
import { Header } from './components';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <HashRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
