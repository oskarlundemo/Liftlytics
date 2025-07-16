
import {Route, Routes} from 'react-router-dom';
import { AccessPortal } from './pages/AccessPortal';

import './App.css'

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AccessPortal/>}/>
            </Routes>
        </div>
  )
}

export default App
