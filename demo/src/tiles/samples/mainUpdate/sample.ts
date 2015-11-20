namespace Demo.Tiles {

  var tileId = 'simpleTile';

  class MainUpdateSample {

    title: string;
    text: string;

    constructor(
      private winAppTile: Win.Tiles.AppTileService,
      $scope: ng.IScope
    ) {
    }

    update() {
      this.winAppTile.update(this.title, this.text);
    }

  }

  app.controller('Tiles.MainUpdate', MainUpdateSample);
}
