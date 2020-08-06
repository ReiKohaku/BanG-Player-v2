export default function () {
  let favoriteList = JSON.parse(localStorage.getItem('favorite'));
  if (!favoriteList) favoriteList = [];
  return {
    favoriteList
  }
}
