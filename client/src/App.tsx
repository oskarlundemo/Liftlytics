
import {Route, Routes} from 'react-router-dom';
import { AccessPortal } from './pages/AccessPortal';
import {PrivateRoute} from "./contexts/PrivateRoute.tsx";

import './App.css'
import {Toaster} from "react-hot-toast";
import {Home} from "./pages/Home.tsx";
import {Workout} from "./pages/Workout.tsx";
import {LogPage} from "./pages/LogPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {StatsPage} from "./pages/StatsPage.tsx";
import {LogProvider} from "./contexts/LogContext.tsx";
import {WorkoutForm} from "./components/LogComponents/WorkoutForm.tsx";
import {CallbackPage} from "./components/AccessPortalComponents/CallbackPage.tsx";
import {StatsProvider} from "./contexts/StatsContext.tsx";

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
                    path="/callback"
                    element={
                    <PrivateRoute>
                        <CallbackPage/>
                    </PrivateRoute>
                }
                />

                <Route
                    path="/log/new"
                    element={
                        <PrivateRoute>
                            <LogProvider>
                                <WorkoutForm />
                            </LogProvider>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/log/:log_id"
                    element={
                        <PrivateRoute>
                            <LogProvider>
                                <WorkoutForm />
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
                            <StatsProvider>
                                <StatsPage />
                            </StatsProvider>
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
