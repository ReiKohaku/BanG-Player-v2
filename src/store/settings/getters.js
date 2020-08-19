export const settings = (state) => {
  let settings = {};
  try {
    settings = JSON.parse(JSON.stringify(state.settings));
  } catch {}
  return settings;
}
