import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import { useAuth } from "./context/AuthContext";

const App = () => {
 return <Home/>
};
export default App;
