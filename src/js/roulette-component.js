Vue.component('roulette', {
    template: `
        <section class="roulette">
            <h2>Let me help you decide</h2>
            <h2>how to brew your next coffee</h2>
            <button 
                type="button"
                class="btn-roll"
                :disabled="rollDisabled"
                @click="roll">
                Roll
            </button>
            <div class="ring-wrapper">
                <div class="method-ring"
                    :style="{
                        transition: ringTransition,
                        transform: 'rotate(' + spinDegree + 'deg)'
                    }">
                    <div class="method-ring-item"
                        v-for="(method, index) in brewMethods"
                        :style="{
                            transform: 'rotate(' + (360 / brewMethods.length * index) + 'deg)',
                            backgroundColor: 'rgba(0, 0, 0, 0.' + (index) + '5)',
                            clipPath: clipPathSting
                        }">
                        <label :class="{'active': index === rollResult}"
                            :style="{
                                transition: labelTransition
                            }">
                            {{method}}
                        </label>
                    </div>
                </div>
                <div class="result-marker"
                    :class="{'active': rollInProgress}"></div>
            </div>
        </section>
    `,
    data: () => ({
        rollDisabled: false,
        rollResult: -1,
        rollInProgress: false,
        spinDegree: 0,
        clipPathSting: '',
        ringTransition: 'transform 3s ease-in-out',
        labelTransition: 'all .2s ease-out'
    }),
    props: {
        brewMethods: Array
    },
    watch: {
        brewMethods() {
            this.resetState();

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
            this.clipPathSting = `path('${getSectorPath(x, y, r, -angle / 2, angle / 2)}')`;
        }
    },
    methods: {
        resetState() {
            this.ringTransition = 'all 0s';
            this.labelTransition = 'all 0s';
            this.spinDegree = 0;
            this.rollResult = -1;
        },
        roll() {
            let rollResult;
            this.rollDisabled = true;
            this.resetState();
            this.rollInProgress = true;

            setTimeout(() => {
                this.rollResult = Math.floor(Math.random() * (this.brewMethods.length));
                this.ringTransition = 'transform 3s ease-in-out';
                this.labelTransition = 'all .2s ease-out 3s';
                this.spinDegree = 1080 - 360 / this.brewMethods.length * this.rollResult;
            }, 100);

            setTimeout(() => {
                this.rollDisabled = false;
                this.rollInProgress = false;
            }, 3000);
        }
    }
});