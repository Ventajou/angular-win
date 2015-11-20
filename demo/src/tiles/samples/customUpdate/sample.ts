namespace Demo.Tiles {

  class CustomUpdateSample {

    constructor(
      private winAppTile: Win.Tiles.AppTileService,
      private CacheFactory: any
    ) {
    }

    update() {
      var cache = this.CacheFactory.get('examples');
      var template = cache.get('tiles/samples/customUpdate/sample.xml');
      this.winAppTile.customUpdate(template);
    }

  }

  app.controller('Tiles.CustomUpdate', CustomUpdateSample);
}
