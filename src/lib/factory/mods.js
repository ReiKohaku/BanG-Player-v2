const Mods = {
  enableMod: (mapContent, mod = '') => {
    switch (mod) {
      case 'singleDog':
        mapContent.slides = [];
        mapContent.notes.forEach(item => item.type = 'single');
        break;
      case 'flickParty':
        mapContent.slides.forEach(item => item.flickend = true)
        mapContent.notes.forEach(item => item.type = (item.type === 'slide') ? 'slide' : 'flick');
        break;
      case 'allFlick':
        mapContent.slides = [];
        mapContent.notes.forEach(item => item.type = 'flick');
        break;
      default:
        break;
    }
  }
}

export default Mods;
