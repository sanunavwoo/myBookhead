
export function filterReducerFunc(filterState,filterAction){
    switch(filterAction.type)
    {
        case "lth": 
            return {
                ...filterState,
                sort: filterAction.payload
            };
        case "htl": 
            return {
                ...filterState,
                sort: filterAction.payload
            };
        
        case "GENRE":
            return{
                ...filterState,
                genre: filterAction.payload.check? 
                [...filterState.genre, filterAction.payload.option] 
                : 
                filterState.genre.length>0 ? filterState.genre.filter((genreValue)=>genreValue!==filterAction.payload.option) :
                []
            };  

        case "COLOUR":{
            return {
                ...filterState,
                colour: filterAction.payload.check?
                [...filterState.colour, filterAction.payload.option]
                :
                filterState.colour.length> 0? filterState.colour.filter((colourVal)=>colourVal!==filterAction.payload.option)
                :
                []
            };
        }
        
        case "1":{
            return {
                ...filterState,
                rating: filterAction.payload
            }
        } 
        case "2":{
            return {
                ...filterState,
                rating: filterAction.payload
            }
        }    
        case "3":{
            return {
                ...filterState,
                rating: filterAction.payload
            }
        } 
        case "4":{
            return {
                ...filterState,
                rating: filterAction.payload
            }
        } 

        case "ratingFilter":{
            return {
                ...filterState,
                rating: filterAction.payload
            }
        }
         
        case "SearchedValue":
            return{
                ...filterState,
                searchedValue: filterAction.payload
            };

        case "Clear":
            return{
                ...filterState,
                sort: "",
                colour:[],
                genre:[],
                searchedValue: "",
                rating: ""
            }    

        default:
            return filterState;
        

    }
}