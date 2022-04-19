import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./navbarComponents/Header";
import InDevelopment from "./InDevelopment";
import HomePage from "./homePageComponents/HomePage";
import ProjectMainPage from "./projectMainPageComponents/ProjectMainPage";
import RequirementDocumentsPage from "./requirementDocumentsComponents/RequirementDocumentsPage";
import UserLoginPage from "./userLoginComponents/UserLoginPage";
import TestDocumentsPage from "./testDocumentsComponents/TestDocumentsPage";

const App = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  console.log(path[1]);

  return (
    <>
      {path[1] !== "login" ? (
        <>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:project_id/main" element={<ProjectMainPage />} />
            <Route
              path="/:project_id/req/:requirementDocuments_id"
              element={<RequirementDocumentsPage />}
            />
            <Route
              path="/:project_id/test/:testDocuments_id"
              element={<TestDocumentsPage />}
            />

            <Route path="inDev" element={<InDevelopment />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<UserLoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
