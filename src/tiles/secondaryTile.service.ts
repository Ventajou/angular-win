namespace Win.Tiles {
  export class SecondaryTileService {

    constructor(
      private $q: ng.IQService,
      private $templateCache: ng.ITemplateCacheService
    ) {
    }

    pin(name: string, id: string, args?: string): ng.IPromise<void> {
      var q = this.$q.defer<void>();

      var logo = new Windows.Foundation.Uri('ms-appx:///images/logo.png');
      var smallLogo = new Windows.Foundation.Uri('ms-appx:///images/small-logo.png');
      var tile = new Windows.UI.StartScreen.SecondaryTile(id, name, name, args, Windows.UI.StartScreen.TileOptions.showNameOnLogo, logo);
      tile.foregroundText = Windows.UI.StartScreen.ForegroundText.light;
      tile.smallLogo = smallLogo;
      tile.requestCreateAsync().then((isCreated: boolean) => {
        if (isCreated) {
          q.resolve();
        } else {
          q.reject();
        }
      });

      return q.promise;
    }

    unpin(id: string): ng.IPromise<void> {
      var q = this.$q.defer<void>();

      if (!Windows.UI.StartScreen.SecondaryTile.exists(id)) {
        q.reject();
      }
      else {
        Windows.UI.StartScreen.SecondaryTile.findAllAsync().done((tiles: any) => {
          if (tiles) {
            tiles.forEach((tile: any) => {
              if (tile.tileId === id) {
                tile.requestDeleteAsync().then((deleted: boolean) => {
                  if (deleted) q.resolve();
                  else q.reject();
                })
              }
            });
          }
        });
      }

      return q.promise;
    }

    pinned(id: string): boolean {
      return Windows.UI.StartScreen.SecondaryTile.exists(id);
    }
  }

  mod.service('winSecondaryTile', SecondaryTileService);
}
