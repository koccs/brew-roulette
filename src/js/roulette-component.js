Vue.component('roulette', {
    template: `
        <section class="roulette">
            <h2>How to brew your next coffee?</h2>
            <button 
                type="button"
                @click="roll">
                Roll
            </button>
            <div class='method-ring'>
                <div class='method-ring-item'
                    v-for="(method, index) in brewMethods"
                    :style="{
                        transform: 'rotate(' + 360/brewMethods.length * (index+1) + 'deg)',
                        backgroundColor: 'var(--orange-'+ (index+1) + '00)'
                    }">
                    <label :class="{'active': index === rollResult}">{{method}}</label>
                </div>
            </div>
        </section>
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