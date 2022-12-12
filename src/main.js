import { createApp } from 'vue';
import App from './App.vue';

import vFocus from './directives/vFocus';

const app = createApp(App);

app.directive('focus', vFocus);

app.mount('#app');
