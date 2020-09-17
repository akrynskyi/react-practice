import React from 'react';

import Counter from './components/Counter';
import Todos from './components/Todos';

function App() {
  return (
    <div className="container mt-4 mb-4">
      <Counter />
      <Todos />
    </div>
  );
}

export default App;
