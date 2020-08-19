import Settings from "src/lib/util/settings";

export const updateOption = (state, name, value) => {
  state.settings[name] = value;
}

export const updateSettings = (state, payload) => {
  let settings = {};
  try {
    settings = JSON.parse(JSON.stringify(payload));
  } catch {}
  for(const i in state.settings) {
    if(settings[i]) state.settings[i] = settings[i];
  }
  Settings.setAll(state.settings);
}
