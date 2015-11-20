namespace Demo.Tiles {

  var tileId = 'simpleTile';

  class SimpleSample {

    pinned: boolean;

    constructor(
      private winSecondaryTile: Win.Tiles.SecondaryTileService,
      $scope: ng.IScope
    ) {
      this.pinned = this.winSecondaryTile.pinned(tileId); 
    }

    toggle() {
      if (this.winSecondaryTile.pinned(tileId)) {
        this.winSecondaryTile.unpin(tileId);
        this.pinned = false;
      }
      else {
        this.winSecondaryTile.pin('HWA test', tileId)
        this.pinned = true;
      }
    }

  }

  app.controller('Tiles.Simple', SimpleSample);
}
