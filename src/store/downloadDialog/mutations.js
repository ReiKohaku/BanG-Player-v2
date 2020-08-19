export const create = (state, payload) => {
  state.downloadDialog = {
    display: false,
    title: null,
    message: null,
    closeable: false,
    ...payload
  }
};

export const update = (state, payload) => {
  state.downloadDialog = {
    ...state.downloadDialog,
    ...payload
  }
}

export const clear = (state) => {
  create(state, null);
}
