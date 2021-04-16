Vue.component('background', {
    template: `
        <div class="background"
            :style="{
                backgroundImage: 'linear-gradient(to right top,rgba(140, 56, 0, 0.8),rgba(161, 105, 8, 0.8)),url(' + bg + ')'
            }"></div>
    `,
    data: () => ({
        bg: '',
    }),
    mounted() {
        this.bg = `assets/img/coffee-bag-${Math.floor(Math.random() * 10) % 2}.jpg`;
    }
});