import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './navbarComponents/Header';
import InDevelopment from './InDevelopment'
import HomePage from './homePageComponents/HomePage'
import ProjectMainPage from './projectMainPageComponents/ProjectMainPage';



ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/:project_id/main" element={<ProjectMainPage />}  />


        <Route path="inDev" element={<InDevelopment />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
