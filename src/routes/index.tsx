// to create routes
import { Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import Produtos from "../pages/Produtos";

const RoutesApp:React.FC = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/produtos" element={<Produtos/>}/>
        </Routes>
    )
}

export default RoutesApp