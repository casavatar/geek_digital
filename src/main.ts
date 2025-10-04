import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './plugins/i18n'
import { initThemeOnLoad } from './composables/useTheme'

// Initialize theme immediately to prevent flash of wrong theme
initThemeOnLoad()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
