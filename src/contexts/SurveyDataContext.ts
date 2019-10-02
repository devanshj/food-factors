import React from "react";
import { SurveyData } from "../survey-data";

const SurveyDataContext = React.createContext<SurveyData>([]);
export default SurveyDataContext;