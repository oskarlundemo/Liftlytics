
import {Route, Routes} from 'react-router-dom';
import { AccessPortal } from './pages/AccessPortal';
import {PrivateRoute} from "./contexts/PrivateRoute.tsx";

import './App.css'
import {Toaster} from "react-hot-toast";
import {Home} from "./pages/Home.tsx";
import {Workout} from "./pages/Workout.tsx";
import {LogPage} from "./pages/LogPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {StatisticsPage} from "./pages/StatisticsPage.tsx";
import {LogProvider} from "./contexts/LogContext.tsx";
import {NewWorkoutPage} from "./components/LogComponents/NewWorkoutSlide.tsx";

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

                <Route
                    path="/log"
                    element={
                        <PrivateRoute>
                            <LogProvider>
                                <LogPage />
                            </LogProvider>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/log/new"
                    element={
                        <PrivateRoute>
                            <LogProvider>
                                <NewWorkoutPage />
                            </LogProvider>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/workouts"
                    element={
                        <PrivateRoute>
                            <Workout />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/statistics"
                    element={
                        <PrivateRoute>
                            <StatisticsPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />

            </Routes>



            <Toaster position="bottom-center" />

        </div>
  )
}

export default App
