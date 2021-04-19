Vue.component('bottom', {
    template: `
        <footer>
            <div>
                <a href="https://github.com/koccs/brew-roulette" 
                    target="_blank"
                    tabindex="0">
                    <i class="fab fa-github-square"></i>
                </a>
            </div>
            <div>
                Made by koccs - 2021
            </div>
            <div>
                <i class="far fa-life-ring"
                    @mouseenter="displayHelp(true)"
                    @mouseleave="displayHelp(false)"
                    tabindex="0"
                    @keydown.enter="displayHelp(!helpVisible)">
                </i>
            </div>
            <div class="help"
                v-if="helpVisible">
                <p>
                    Method list is stored in your browser. The page does not use cookies or collect any data about the user.
                </p>
                <p>
                    For best experience please use Chrome, Safari or Edge.
                </p>
            </div>
        </footer>
    `,
    data: () => ({
        helpVisible: false
    }),
    methods: {
        displayHelp(visible) {
            this.helpVisible = visible;
        }
    }
});