import { createApp } from 'vue';
import App from '@/App.vue';

import vFocus from '@/directives/vFocus';
import vClipboard from '@/directives/vClipboard';

const app = createApp(App);

app.directive('focus', vFocus);
app.directive('clipboard', vClipboard);

app.mount('#app');
