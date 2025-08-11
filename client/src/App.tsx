
import {Route, Routes} from 'react-router-dom';
import { AccessPortal } from './pages/AccessPortal';
import {PrivateRoute} from "./contexts/PrivateRoute.tsx";

import './App.css'
import {Toaster} from "react-hot-toast";
import {Home} from "./pages/Home.tsx";
import {LogPage} from "./pages/LogPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {StatsPage} from "./pages/StatsPage.tsx";
import {LogProvider} from "./contexts/LogContext.tsx";
import {WorkoutForm} from "./components/LogComponents/WorkoutForm.tsx";
import {CallbackPage} from "./components/AccessPortalComponents/CallbackPage.tsx";
import {StatsProvider} from "./contexts/StatsContext.tsx";
import {ConfigureExercisesPage} from "./pages/ConfigureExercisesPage.tsx";
import {ExerciseProvider} from "./contexts/ExerciseContext.tsx";
import {Account} from "./pages/Account.tsx";
import {ConfigureMuscleGroup} from "./pages/ConfigureMuscleGroup.tsx";
import {MuscleGroupProvider} from "./contexts/MuscleGroupContext.tsx";
import {ExerciseStats} from "./pages/ExerciseStats.tsx";

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
                    path="/statistics/:exercise-name/:exercise-id"
                    element={
                        <PrivateRoute>
                            <StatsProvider>
                                <ExerciseStats />
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

                <Route
                    path="/profile/:user-id"
                    element={
                        <PrivateRoute>
                            <Account />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile/exercises"
                    element={
                        <PrivateRoute>
                            <ExerciseProvider>
                                <ConfigureExercisesPage />
                            </ExerciseProvider>
                        </PrivateRoute>
                    }
                />


                <Route
                    path="/profile/muscle-groups"
                    element={
                        <PrivateRoute>
                            <MuscleGroupProvider>
                                <ConfigureMuscleGroup />
                            </MuscleGroupProvider>
                        </PrivateRoute>
                    }
                />




            </Routes>



            <Toaster position="bottom-center" />

        </div>
  )
}

export default App
