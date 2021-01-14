let updates = canvas.tiles.placeables.filter(t => t.data.flags.parallaxia).map(t => {
  return {
    _id: t.id,
    if (flags.parallaxia.isTarget === false) {
        'flags.parallaxia.isTarget': true,
    } else {
        'flags.parallaxia.isTarget': false,
    }
  }
});
canvas.tiles.updateMany(updates)

let updates = canvas.tiles.placeables.filter(t => t.data.flags.parallaxia).map(t => {
    return {
      _id: t.id,
      'flags.parallaxia.isTarget': true,
    }
  });
  canvas.tiles.updateMany(updates)