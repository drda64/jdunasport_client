import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ('@/assets/main.css')
import Notifications from '@kyvg/vue3-notification'
import { setLocale } from 'yup';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')

setLocale({
    mixed: {
        default: 'Neplatné pole',
        required: 'Toto pole je povinné',
        oneOf: 'Hodnota musí být jedna z následujících: ${values}',
        notOneOf: 'Hodnota nesmí být jedna z následujících: ${values}',
        notType: 'Toto pole musí být typu ${type}',
    },
    string: {
        length: 'Text musí být přesně ${length} znaků',
        min: 'Text musí mít alespoň ${min} znaků',
        max: 'Text musí mít nejvýše ${max} znaků',
        matches: 'Text musí odpovídat následujícímu vzoru: "${regex}"',
        email: 'Text musí být platný e-mail',
        url: 'Text musí být platná URL adresa',
        trim: 'Text nesmí obsahovat bílé znaky na začátku a na konci',
        lowercase: 'Text musí být malými písmeny',
        uppercase: 'Text musí být velkými písmeny',
    },
    number: {
        min: 'Číslo musí být větší nebo rovno ${min}',
        max: 'Číslo musí být menší nebo rovno ${max}',
        lessThan: 'Číslo musí být menší než ${less}',
        moreThan: 'Číslo musí být větší než ${more}',
        positive: 'Číslo musí být kladné',
        negative: 'Číslo musí být záporné',
        integer: 'Číslo musí být celé číslo',
    },
    date: {
        min: 'Datum musí být po ${min}',
        max: 'Datum musí být před ${max}',
    },
    array: {
        min: 'Pole musí obsahovat alespoň ${min} prvků',
        max: 'Pole musí obsahovat nejvýše ${max} prvků',
    },
});