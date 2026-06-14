import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuildingList from "./components/BuildingList";
import BuildingForm from "./components/BuildingForm";
import "./App.css";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import JwtToken from "./components/JwtToken";

function App() {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route element={
                        <ProtectedRoute>
                            <Navigation />
                        </ProtectedRoute>
                        }>
                            <Route path="/" element={<BuildingList />} />
                            <Route path="/create" element={<BuildingForm />} />
                            <Route path="/jwt" element={<JwtToken />} />
                        </Route>
                    </Routes>
        </BrowserRouter>
    );
}

export default App;