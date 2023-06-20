import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./element/Home";
import Create from "./element/Create";
import Read from "./element/Read";
import Edit from "./element/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
