import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cybercom from './cybercom.tsx';
import Home from './Home.tsx'
import { CContainer } from '@coreui/react'

function App() {
    return (
        <CContainer className="px-4" lg>
            <h1>UNofficial CYBERCOM Portal</h1>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cybercom" element={<Cybercom />} />
                    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Routes>
            </div>
        </CContainer>
    );
}

export default App;
