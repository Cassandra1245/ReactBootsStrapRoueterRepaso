import logo from './logo.svg';
import Messages from './Messages.js';
import MessContacto from './MessContacto.js';
import { MessProvider } from './MessContext.js';
import { BrowserRouter, Route, Routes } from "react-router";
import './App.css';

function App() {
  return (
    <div>
      <MessProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Messages />} />
            <Route path="/MessContacto/:filtro" element={<MessContacto />} />
          </Routes>
        </BrowserRouter>
      </MessProvider>
    </div>
  );
}

export default App;
