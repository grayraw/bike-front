import store from './../store/store.js'

export default {

    getFilters(){
        return this.getContent(url + '/filters');
    }
}