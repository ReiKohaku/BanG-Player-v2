export default function () {
  let favoriteList = [];
  let historyList = [];
  try {
    favoriteList = JSON.parse(localStorage.getItem('favorite')) || [];
  } catch {
  }
  try {
    historyList = JSON.parse(localStorage.getItem('history')) || [];
  } catch {
  }
  return {
    favoriteList,
    historyList
  }
}
