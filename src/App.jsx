import React from 'react';
import './styles/app.scss'
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className='app'>
                <Routes>
                    <Route
                        path='/PAINT-ONLINE-FRONT/paint'
                        element={<><Toolbar/>
                            <SettingBar/>
                            <Canvas/></>}
                    />
                    <Route path="/PAINT-ONLINE-FRONT" element={<Navigate to={`/PAINT-ONLINE-FRONT/paint?sessionId=f${(+new Date()).toString(16)}`} />}/>
                    <Route path="*" element={<Navigate to={`/PAINT-ONLINE-FRONT/paint?sessionId=f${(+new Date()).toString(16)}`} />}/>
                </Routes>
            </div>
        </BrowserRouter>

    );
};

export default App;