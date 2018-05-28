import store from './../store/store.js'

let url = 'http://localhost:8080';

export default {

    getFilters(){
        return this.getContent(url + '/filters');
    },
    getBikeList(){
        let query = window.location.search;
        return this.getContent(url + '/list' + query);
    },

    getContent(endpoint){
        let hdrs = new Headers();
        hdrs.append('Content-Type', 'application/json');
        hdrs.append('Accept', 'application/json');
        let body = '';
        let options = { method: 'GET',
                        headers: hdrs,
                        // credentials: 'include'
                     };
        return fetch(endpoint, options).then((response)=>{
            switch(response.ok){
                case true: {
                    return response.json()
                }
                default: {
                    return false
                }
            }
        });
    }
}