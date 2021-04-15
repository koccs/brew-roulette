Vue.component('roulette', {
    template: `
        <section class="roulette">
            <h2>How to brew your next coffee?</h2>
            <button 
                type="button"
                @click="roll">
                Roll
            </button>
            <div class="method-ring"
                :style="{
                    transform: 'rotate(' + spinDegree + 'deg)'
                }">
                <div class="method-ring-item"
                    v-for="(method, index) in brewMethods"
                    :style="{
                        transform: 'rotate(' + (360 / brewMethods.length * index) + 'deg)',
                        backgroundColor: 'rgba(0, 0, 0, 0.' + (index+1) + '5)',
                        clipPath: clipPathSting
                    }">
                    <label :class="{'active': index === rollResult}">{{method}}</label>
                </div>
            </div>
        </section>
    `,
    data: () => ({
        rollResult: -1,
        spinDegree: 0,
        clipPathSting: '',
        clipPathStringInner: '',
    }),
    props: {
        brewMethods: Array
    },
    watch: {
        brewMethods() {
            const getSectorPath = (x, y, outerDiameter, a1, a2) => {
                const degtorad = Math.PI / 180;
                const cr = outerDiameter / 2;
                const cx1 = Math.cos(degtorad * a2) * cr + x;
                const cy1 = -Math.sin(degtorad * a2) * cr + y;
                const cx2 = Math.cos(degtorad * a1) * cr + x;
                const cy2 = -Math.sin(degtorad * a1) * cr + y;
            
                return `M${x} ${y} ${cx1} ${cy1} A${cr} ${cr} 0 0 1 ${cx2} ${cy2}Z`;
            }

            const x = 0;
            const y = 150;
            const r = 300;
            const angle = 360 / this.brewMethods.length;
            this.clipPathStringInner = getSectorPath(x, y, r, -angle/2, angle/2);
            this.clipPathSting = `path('${this.clipPathStringInner}')`;
        }
    },
    methods: {
        roll() {
            this.rollResult = Math.floor(Math.random() * (this.brewMethods.length));
            this.spinDegree = 720;
        }
    }
});