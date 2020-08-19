export const gameLoadConfig =  (state) => {
  let gameLoadConfig = null;
  try {
    gameLoadConfig = state.gameLoadConfig;
  } catch {}
  return gameLoadConfig;
}
