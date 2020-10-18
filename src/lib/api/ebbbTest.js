import Axios from 'axios';
const axios = Axios;

const Ebbb = {
  getChartInfo: async (id) => {
    let data = await axios.get('https://editor.reikohaku.fun/test/get/chart', {
      params: {id}
    });
    console.log(data);
    return data;
  }
}

export default Ebbb;
