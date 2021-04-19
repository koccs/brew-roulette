Vue.component('list-editor', {
    template: `
        <section class="list-editor">
            <h2>Add or remove brew methods</h2>
            <div class='method-list'>
                <div class='method-list-item'
                    v-for="method in brewMethods"
                    :key="method">
                    <label>{{method}}</label>
                    <button type="button"
                        class="btn-icon"
                        @click="removeMethod(method)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="new-method">
                <div class="input-wrapper">
                    <input type="text"
                        v-model="newMethod"
                        @keydown.enter="newMethod && addMethod()"
                        :placeholder="placeholder"
                        :disabled="this.disableAddition"
                        :class="{'error': error}" />
                    <button type="button"
                        class="btn-primary"
                        @click="addMethod"
                        :disabled="!newMethod || this.disableAddition">
                        Add
                    </button>
                </div>
                <div class="method-error"
                    v-if="error">
                    {{error}}
                </div>
            </div>
        </section>
    `,
    data: () => ({
        newMethod: '',
        placeholder: '',
        disableAddition: false,
        error: ''
    }),
    props: {
        brewMethods: Array
    },
    watch: {
        brewMethods() {
            if (this.brewMethods.length < 10) {
                this.placeholder = 'Add new method';
                this.disableAddition = false;
            } else {
                this.placeholder = 'The roulette is full';
                this.disableAddition = true;
            }
        }
    },
    methods: {
        addMethod() {
            this.error = '';
            if (this.brewMethods.map((m) => m.replaceAll(' ', '').toLowerCase()).includes(this.newMethod.replaceAll(' ', '').toLowerCase())) {
                this.error = 'Method must be unique';
                return;
            }
            const newList = [...this.brewMethods];
            newList.push(this.newMethod);
            this.$emit('update-list', newList);
            this.newMethod = '';
        },
        removeMethod(method) {
            const newList = this.brewMethods.filter((m) => m !== method);
            this.$emit('update-list', newList);
        }
    }
});