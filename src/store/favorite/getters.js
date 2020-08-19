import Store from 'src/store'

export const isFavorite = (state) => {
  if (!state.favoriteList || state.favoriteList.length === 0) return false;
  try {
    const type = Store.state.chartInfo.chartInfo.type;
    const id = Store.state.chartInfo.chartInfo.id;
    for (const i in state.favoriteList) {
      if(state.favoriteList[i].type === type && state.favoriteList[i].id === id) return true;
    }
  } catch {
  }
  return false;
}
