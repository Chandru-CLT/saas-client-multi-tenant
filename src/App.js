import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { appRouters } from './Routes';

function App() {
  return (
    <div>
      <RouterProvider router={appRouters} />
    </div>
  );
}

export default App;
