import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Cart } from './pages';
import { Header } from './components';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
