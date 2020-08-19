import Vue from 'vue';

const Github = {
  getContent: async (owner, repo, path, branch) => {
    let path_ = path || '/', branch_ = branch || 'master';
    path_ = path_.replace('\\', '/');
    if (path_.indexOf('/') !== 0) path_ = `/${path_}`;
    let data = await Vue.prototype.$axios.get(`https://api.bangplayer.live/github/api/repos/${owner}/${repo}/contents${path_}`, {
      params: {
        ref: branch
      }
    });
    data = JSON.stringify(data);
    data = data.replace('https://api.github.com', 'https://api.bangplayer.live/github/api');
    data = data.replace('https://raw.githubusercontent.com', 'https://api.bangplayer.live/github/raw');
    data = JSON.parse(data);
    return data;
  },
  getRaw: async (owner, repo, path, branch) => {
    let path_ = path || '/', branch_ = branch || 'master';
    path_ = path_.replace('\\', '/');
    if (path_.indexOf('/') !== 0) path_ = `/${path_}`;
    let data = await Vue.prototype.$axios.get(`https://api.bangplayer.live/github/raw/${owner}/${repo}/${branch_}${path_}`)
    return data;
  }
};

Github.install = function (Vue, options) {
  Vue.prototype.$github = Github
};

export default Github;
