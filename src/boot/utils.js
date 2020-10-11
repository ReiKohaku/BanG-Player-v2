import Vue from 'vue';
import Bestdori from 'src/lib/api/bestdori';
import Lang from 'src/lib/util/lang';
import Sound from 'src/lib/util/sound';
import Chart from 'src/lib/util/chart';
import Settings from 'src/lib/util/settings';
import File from 'src/lib/util/file';
import Action from 'src/lib/util/action';
import Github from 'src/lib/api/github';

Vue.use(Bestdori)
Vue.use(Lang)
Vue.use(Sound)
Vue.use(Chart)
Vue.use(Settings)
Vue.use(File)
Vue.use(Github)
Vue.use(Action)
