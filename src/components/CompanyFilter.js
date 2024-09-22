import { useGridFilter } from "ag-grid-react";
import { useState, useEffect, useCallback } from "react";

function CompanyFilter({ model, onModelChange, getValue}) {
    const [checkboxState, setCheckboxState] = useState({
        ISRO: false,
        SpaceX: false,
        Roscosmos: false,
    });

    useEffect(() => {
        onModelChange({ values: Object.keys(checkboxState).filter((key) => checkboxState[key]) });
    }, [checkboxState, onModelChange]);

    const doesFilterPass = useCallback(({ node }) => {
        const selectedCompanies = model?.values || [];
        if (selectedCompanies.length === 0) {
            return true;
        }
        return selectedCompanies.includes(getValue(node));
    }, [model, getValue]);

    useGridFilter({ doesFilterPass });

    const handleCheckboxChange = (company) => {
        setCheckboxState((prevState) => {
            const newState = { ...prevState, [company]: !prevState[company] };
            onModelChange({ values: Object.keys(newState).filter((key) => newState[key]) });
            return newState;
        });
    };

    return (
        <div className="flex flex-col m-2">
            <strong className="mb-2">Company Filter</strong>
            <div className="flex items-center gap-x-2 mb-1">
                <input
                    type="checkbox"
                    name="ISRO"
                    checked={checkboxState.ISRO}
                    onChange={() => handleCheckboxChange("ISRO")}
                />
                <label>ISRO</label>
            </div>

            <div className="flex items-center gap-x-2 mb-1">
                <input
                    type="checkbox"
                    name="SpaceX"
                    checked={checkboxState.SpaceX}
                    onChange={() => handleCheckboxChange("SpaceX")}
                />
                <label>SpaceX</label>
            </div>

            <div className="flex items-center gap-x-2 mb-1">
                <input
                    type="checkbox"
                    name="Roscosmos"
                    checked={checkboxState.Roscosmos}
                    onChange={() => handleCheckboxChange("Roscosmos")}
                />
                <label>Roscosmos</label>
            </div>
        </div>
    );
}

export default CompanyFilter;
