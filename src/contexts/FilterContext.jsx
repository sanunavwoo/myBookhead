import {createContext, useReducer,useState} from "react";
import { filterReducerFunc } from "../reducers/filterReducer";



const initialState= {
    sort:"",
    genre:"",
    colour:[],
    rating:"",
    searchedValue:""
};
export const FilterContext= createContext(initialState);

export function FilterContextProvider({children}){

    

    const [filterState, filterDispatch]= useReducer(filterReducerFunc,
        {
            sort:"",
            genre:[],
            colour:[],
            rating:"",
            searchedValue:""
        }
    );
    

    // console.log("IsRating checked: ",isRatingChecked);
    return(
    <>
        <FilterContext.Provider value={{filterState,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    </>);
}