import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import "./Filter.css";
export function Colour(){

    const {filterState, filterDispatch}= useContext(FilterContext);

    function handleColour(e,option){
        const check= e.target.checked;
        console.log("Colour checked::",option,check);
        filterDispatch({
            type: "COLOUR",
            payload:{
                option,
                check
            }
        })
    }
    return(
        <>
            <div className="category">
                <div className="category-title">
                    Colour
                </div>
                <div className="category-select">
                    <label className="sort-label">
                        <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleColour(e,"red")}
                            checked= {filterState.colour.includes("red")}

                            />
                        <span>Red</span>    
                    </label>
                    <label className="sort-label">
                    <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleColour(e,"black")}
                            checked= {filterState.colour.includes("black")}

                            />
                        <span>Black</span>    
                    </label>
                    <label className="sort-label">
                    <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleColour(e,"blue")}
                            checked= {filterState.colour.includes("blue")}

                            />
                        <span>Blue</span> 
                    </label>
                    <label className="sort-label">
                    <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleColour(e,"green")}
                            checked= {filterState.colour.includes("green")}

                            />
                        <span>Green</span> 
                    </label>
                    <label className="sort-label">
                    <input 
                            type="checkbox" 
                            className="input"
                            onChange={(e)=>handleColour(e,"white")}
                            checked= {filterState.colour.includes("white")}

                            />
                        <span>White</span> 
                    </label>
                </div>
            </div>
        </>
    );
}