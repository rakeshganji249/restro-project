import { createApp } from 'vue'
import App from './App.vue'
import router from './routers.js'
import store from './store'
import logPlugin from './plugins/logger'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)

// Use plugin with optional prefix
app.use(logPlugin, { prefix: '[MyApp]' })

app.use(router).use(store).mount('#app')
