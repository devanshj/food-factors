import React, { useEffect, useState } from "react";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { fetchSurveyData } from "../../survey-data";

import "./index.css"
import Select from "../Select";
import Strategy from "../Strategy";
import { isDev } from "../../utils";


const App = () => {
	let [surveyData, setSurveyData] = useState(null as number[][] | null);
	let [strategy, setStrategy] = useState(1);

    useEffect(() => {
        fetchSurveyData(isDev()).then(setSurveyData)
    }, [])

    return (
        surveyData === null
            ? <p>Getting data from speadsheet....</p>
            : <SurveyDataContext.Provider value={surveyData}>
				Now test
                <Select
					value={strategy}
					onChange={setStrategy}
					options={[
						"Categories influenced per factor",
						"Factor influence per category"
					]}
					label="Strategy"
				/>
				<Strategy value={strategy}/>
            </SurveyDataContext.Provider>
    )
}
export default App;