import Store from 'src/store'

export const isFavorite = (state) => {
  return state.favoriteList.includes(Store.state.chartInfo.chartInfo);
}
