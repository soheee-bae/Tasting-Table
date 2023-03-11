import './App.scss';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* <Route index element={}/> */}
      <Route path={'/login'} element={<div></div>} />
    </Routes>
  );
}

export default App;
