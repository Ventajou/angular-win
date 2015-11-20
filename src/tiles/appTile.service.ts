namespace Win.Tiles {
  export class AppTileService {

    private updater: Windows.UI.Notifications.TileUpdater;

    constructor(
      private $templateCache: ng.ITemplateCacheService
    ) {
      this.updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();
    }

    update(title: string, text: string) {
      this.customUpdate(
        <string>this.$templateCache.get('tiles/templates/default.xml'),
        { title: title, text: text }
      );
    }

    customUpdate(template: string, data?: any) {
      this.updater.enableNotificationQueue(true);
      var t = _.template(template);
      var compiled = t({ tile: data });
      var xmlDocument = new Windows.Data.Xml.Dom.XmlDocument();
      xmlDocument.loadXml(compiled);
      this.updater.update(new Windows.UI.Notifications.TileNotification(xmlDocument));
    }

    clearUpdates() {
      this.updater.clear();
    }
  }

  mod.service('winAppTile', AppTileService);
}
