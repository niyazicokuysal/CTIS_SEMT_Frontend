import React from 'react'
import { useLocation } from "react-router-dom";

const RequirementDocumentBaseline = () => {
    const { pathname } = useLocation();
    const path = pathname.split("/");
    const projId = path[1];
    const reqDocName= path[3];
  
  return (
    <div>{projId} baseline of {reqDocName}</div>
  )
}

export default RequirementDocumentBaseline