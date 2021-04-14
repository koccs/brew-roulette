Vue.component('list-editor', {
    template: `
        <div class="list-editor">
            <h2>Add or remove brew methods</h2>
            <div class='method-list' 
                v-for="method in brewMethods"
            >
                <label>{{method}}</label>
                <button type="button"
                    @click="removeMethod(method)">
                    X
                </button>
            </div>
            <div class="new-method">
                <input type="text"
                    v-model="newMethod"
                    placeholder="Add new method"/>
                <button type="button"
                    @click="addMethod">
                    Add
                </button>
            </div>
        </div>
    `,
    data: () => ({
        newMethod: ''
    }),
    props: {
        brewMethods: Array
    },
    methods: {
        addMethod() {
            if (this.newMethod) {
                const newList = [ ...this.brewMethods ];
                newList.push(this.newMethod);
                this.$emit('update-list', newList);
                this.newMethod = '';
            } else {
                alert('no empty');
            }
        },
        removeMethod(method) {
            const newList = this.brewMethods.filter((m) => m !== method);
            this.$emit('update-list', newList);
        }
    }
});