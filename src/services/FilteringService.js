import store from './../store/store.js'
import * as qs from 'query-string';
import BikeApi from './BikeApi';
import history from './../history'


//this monitors url and sends requests for bikes if url changes
//all you need is just to update url itself
let prevSearchQuery = store.getState().router.location.search;
store.subscribe(() => {
    let searchQuery = store.getState().router.location.search;
    if (prevSearchQuery !== searchQuery) {
        prevSearchQuery = searchQuery;
        console.log(searchQuery);
        BikeApi.getBikeList().then((res) => {
            if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res.docs });
        });
    }
})

export default {
    //intended behaviour with pages reset on new filter pick but not clear why
    //or not
    updateQueryString(val, param) {

        val = val + ""; //converting to string to remove comparasion bugs

        let currentParams = qs.parse(store.getState().router.location.search, { arrayFormat: "bracket" });
        let currentValues = currentParams[param];

        if (param === 'page') {
            currentValues = val;
        } else {
            //if value is in url remove, otherwise add it to url
            currentValues ?
                currentValues.includes(val) ?
                    currentValues = currentValues.filter(item => item !== val) :
                    currentValues = [...currentValues, val] :
                currentValues = [val];

            delete currentParams['page'];
        }

        // removes duplicates, seems no longer needed
        // currentValues = [...new Set(currentValues)];

        currentParams[param] = currentValues;
        let newURL = qs.stringify(currentParams, { arrayFormat: "bracket" });

        history.push("?" + newURL);
    }
}