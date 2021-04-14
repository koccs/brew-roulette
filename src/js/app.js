const defaultBrewMethods = ['Espresso', 'AeroPress', 'V60', 'French Press'];
const brewMethodsKey = 'brew-methods';
const app = new Vue({
    el: '#app',
    data: () => ({
        brewMethods: null
    }),
    mounted() {
        const _brewMethods = localStorage.getItem(brewMethodsKey);
        // initialize local storage and app with default values
        if (!_brewMethods) {
            this.brewMethods = defaultBrewMethods;
            localStorage.setItem(brewMethodsKey, defaultBrewMethods);
        } else {
            this.brewMethods = _brewMethods.split(',');
        }
    },
    methods: {
        saveList(list) {
            localStorage.setItem(brewMethodsKey, list);
            this.brewMethods = list;
        }
    }
});

