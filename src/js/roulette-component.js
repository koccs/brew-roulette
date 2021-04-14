Vue.component('roulette', {
    template: `
        <div>
            <h2>How to brew your next coffee?</h2>
            <button 
                type="button"
                @click="roll">
                Roll
            </button>
            <div class='method-list' 
                v-for="(method, index) in brewMethods">
                <label :class="{'active': index === rollResult}">{{method}}</label>
            </div>
        </div>
    `,
    data: () => ({
        rollResult: -1
    }),
    props: {
        brewMethods: Array
    },
    methods: {
        roll() {
            this.rollResult = Math.floor(Math.random() * (this.brewMethods.length));
        }
    }
});