namespace Demo.Tiles {

  class ClearUpdatesSample {

    constructor(
      private winAppTile: Win.Tiles.AppTileService
    ) {
    }

    clearUpdates() {
      this.winAppTile.clearUpdates();
    }

  }

  app.controller('Tiles.ClearUpdate', ClearUpdatesSample);
}
