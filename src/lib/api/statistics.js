import Vue from 'vue';

const Statistics = {
  new: async (type, id) => {
    return;
    try {
      let data = await Vue.prototype.$axios.post(`https://api.bangplayer.reikohaku.fun/play/statistics/new`, {
        type,
        id
      });
      if (!data.status) throw new Error(data.error);
      return data;
    } catch {
    }
  },
  latest: async  () => {
    return;
    let data = await Vue.prototype.$axios.post(`https://api.bangplayer.reikohaku.fun/play/statistics/latest`, {size: 10});
    if (!data.status) throw new Error(data.error);
    return data;
  },
  hot: async () => {
    return;
    let data = await Vue.prototype.$axios.post(`https://api.bangplayer.reikohaku.fun/play/statistics/hot`, {size: 10});
    if (!data.status) throw new Error(data.error);
    return data;
  }
}

export default Statistics;
