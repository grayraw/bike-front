import store from './../store/store.js'
import * as qs from 'query-string';
import BikeApi from './BikeApi';

export default {

    getFilters() {
        // return this.getContent(url + '/filters');
    },

    updateQueryString(val, param) {
        console.log(val, param);

        //this updates url for bikeListPage to work with
        //it's better to move it elsewhere per principle of separation of concern;
        let currentParams = qs.parse(window.location.search, { arrayFormat: "bracket" });
        let currentValues = currentParams[param];

        // if (param === 'pages') {

        // } else {
        //if value is in url remove, otherwise add it to url
        currentValues && param !== "pages" ?
            currentValues.includes(val) ?
                currentValues = currentValues.filter(item => item !== val) :
                currentValues = [...currentValues, val] :
            currentValues = [val];
        // }

        // removes duplicates, seems no longer needed
        currentValues = [...new Set(currentValues)];

        currentParams[param] = currentValues;
        currentParams["travel"] = [100, 110, 115];
        let newURL = qs.stringify(currentParams, { arrayFormat: "bracket" });

        window.history.pushState(null, null, "?" + newURL);
        BikeApi.getBikeList().then((res) => {
            if (res) store.dispatch({ type: 'LOAD_BIKES', payload: res.docs });
        });
    }
}