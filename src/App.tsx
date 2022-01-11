import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Search } from './views/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
