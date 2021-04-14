Vue.component('list-editor', {
    template: `
        <section class="list-editor">
            <h2>Add or remove brew methods</h2>
            <div class='method-list'>
                <div class='method-list-item'
                    v-for="method in brewMethods">
                    <label>{{method}}</label>
                    <button type="button"
                        @click="removeMethod(method)">
                        X
                    </button>
                </div>
            </div>
            <div class="new-method">
                <input type="text"
                    v-model="newMethod"
                    placeholder="Add new method"/>
                <button type="button"
                    @click="addMethod"
                    :disabled="!newMethod">
                    Add
                </button>
            </div>
        </section>
    `,
    data: () => ({
        newMethod: ''
    }),
    props: {
        brewMethods: Array
    },
    methods: {
        addMethod() {
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