export const newCancel = (state, payload) => {
  state.cancel.push(payload);
}

export const doCancel = (state) => {
  state.cancel.forEach(item => {
    item && item();
  })
  state.cancel.length = 0;
}
