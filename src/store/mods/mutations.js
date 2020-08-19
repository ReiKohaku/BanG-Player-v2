export const updateMod = (state, payload) => {
  const mod = payload.toLowerCase();
  if(mod === 'sd' || mod === 'singledog') state.mod = 'singleDog';
  else if(mod === 'fp' || mod === 'flickparty') state.mod = 'flickParty';
  else if(mod === 'af' || mod === 'allflick') state.mod = 'allFlick';
  else state.mod = '';
}
