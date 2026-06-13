import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuildingList from "./components/BuildingList";
import BuildingForm from "./components/BuildingForm";
import "./App.css";
import Navigation from "./components/Navigation";

function App() {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route element={<Navigation />}>
                            <Route path="/" element={<BuildingList />} />
                            <Route path="/create" element={<BuildingForm />} />
                        </Route>
                    </Routes>
        </BrowserRouter>
    );
}

export default App;