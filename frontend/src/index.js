import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './pages/Main';
import Results from './pages/Results';
import AboutUs from './pages/AboutUs';
import DiseasePage from './pages/Disease';
import GroupPage from './pages/Group';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="results" element={<Results />} />
          <Route path="aboutus" element={<AboutUs/>} />
          <Route path="disease/:id" element={<DiseasePage/>} />
          <Route path="group/:id" element={<GroupPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
