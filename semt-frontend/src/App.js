import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./navbarComponents/Header";
import InDevelopment from "./InDevelopment";
import HomePage from "./homePageComponents/HomePage";
import ProjectMainPage from "./projectMainPageComponents/ProjectMainPage";
import RequirementDocumentsPage from "./requirementDocumentsComponents/RequirementDocumentsPage";
import LandingPage from "./landingPage/LandingPage";
import TestDocumentsPage from "./testDocumentsComponents/TestDocumentsPage";
import RequirementDocumentBaseline from "./requirementDocumentsComponents/RequirementDocumentBaseline";
import TestDocumentsBaseline from "./testDocumentsComponents/TestDocumentsBaseline";

const App = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/");

  return (
    <>
      {path[1] !== "landing" ? (
        <>
          <Header />

          <Routes>
            <Route path="/"                                                   element={<HomePage />} />
            <Route path="/:project_id/main"                                   element={<ProjectMainPage />} />
            <Route path="/:project_id/req/:requirementDocuments_id"           element={<RequirementDocumentsPage />}/>
            <Route path="/:project_id/reqDocBaseline/:requirementDocuments_id"    element={<RequirementDocumentBaseline />}/>
            <Route path="/:project_id/test/:testDocuments_id"                 element={<TestDocumentsPage />}/>
            <Route path="/:project_id/testDocBaseline/:testDocuments_id"    element={<TestDocumentsBaseline />}/>
            <Route path="inDev"                                               element={<InDevelopment />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/landing"                                                 element={<LandingPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
