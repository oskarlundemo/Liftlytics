
import {Route, Routes} from 'react-router-dom';
import { AccessPortal } from './pages/AccessPortal';
import {PrivateRoute} from "./contexts/PrivateRoute.tsx";

import './App.css'
import {Toaster} from "react-hot-toast";
import {Home} from "./pages/Home.tsx";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AccessPortal />} />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>



            <Toaster position="bottom-center" />

        </div>
  )
}

export default App
