import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
    if (process.client) {
        return new VuexPersistence({
            storage: window.sessionStorage
        }).plugin(store);
    }
}