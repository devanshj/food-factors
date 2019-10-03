import React, { useEffect, useState } from "react";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { fetchSurveyData } from "../../survey-data";

import "./index.css"
import Select from "../Select";
import Strategy from "../Strategy";

const App = () => {
	let [surveyData, setSurveyData] = useState(null as (number|null)[][] | null);
	let [strategy, setStrategy] = useState(3);

    useEffect(() => {
		fetchSurveyData().then(setSurveyData);
	}, []);

    return (
        surveyData === null
            ? <p>Getting data from speadsheet....</p>
            : <SurveyDataContext.Provider value={surveyData}>
                <Select
					value={strategy}
					onChange={setStrategy}
					options={[
						"Categories influenced per factor",
						"Factor influence per category",
						"Factor influence averaged",
						"Categories influenced"
					]}
					label="Strategy"
				/>
				<Strategy value={strategy}/>
            </SurveyDataContext.Provider>
    )
}
export default App;