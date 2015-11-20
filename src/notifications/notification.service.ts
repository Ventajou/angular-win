namespace Win.Notifications {
  // Going further: http://blogs.msdn.com/b/tiles_and_toasts/archive/2015/07/02/adaptive-and-interactive-toast-notifications-for-windows-10.aspx

  /**
   * Configures a toast notification that uses the built-in template
   */
  export interface INotificationOptions {

    /**
     * Shown on the notification's first line
     */
    title: string

    /**
     * Displayed belowed the title
     */
    message: string

    /**
     * You may specify up to 3 actions. They are typically represented as buttons.
     */
    actions?: {

      /**
       * This will typically be the button label
       */
      label: string

      /**
       * This value will be returned when handling the notification event to determine the action taken by the user.
       */
      value: string
    }[]

    /**
     * Inputs may be either text fields or dropdowns depending on whether the options array is present.
     */
    inputs?: {

      /**
       * Will be used as a key in the inputs returned with the notification
       */
      id: string

      /**
       * Array of options the user may choose from. Populating this array will make the input a dropdown
       */
      options?: {

        /**
         * Will be returned as the input's value when the user picked an option
         */
        id: string

        /**
         * User friendly label visible in the dropdown
         */
        label: string
      }[]
    }[]
  }

  /**
   * Sent with the win:notification event to allow handling the user's input
   */
  export interface INotificationParams<T> {
    /**
     * If the user activated a notification action, the action's value will be here
     */
    argument: string

    /**
     * Populated when the user enters some data
     */
    inputs: T
    
    timestamp: Date
  }
  
  var notifications: INotificationParams<any>[] = [];

  export class NotificationService {
    constructor(
      private $templateCache: ng.ITemplateCacheService
      ) { }

    /**
    * Shows a toast notification using the built-in template.
    *
    * @param config Configures the notification.
    */
    notify(config: INotificationOptions) {
      this.custom(
        <string>this.$templateCache.get('notifications/templates/default.xml'),
        config);
    }

    /**
     * Shows a custom toast notification.
     *
     * @param template A lodash template that renders the XML used by the Windows API to render the notification.
     * @param data data passed to lodash to "render" the template
     */
    custom(template: string, data: any) {
      var t = _.template(template);
      var compiled = t({ toast: data });
      var xmlDocument = new Windows.Data.Xml.Dom.XmlDocument();
      xmlDocument.loadXml(compiled);
      var toast = new Windows.UI.Notifications.ToastNotification(xmlDocument);
      var toastNotifier = Windows.UI.Notifications.ToastNotificationManager.createToastNotifier();
      toastNotifier.show(toast);
    }
    
    notifications() {
      return notifications;
    }
  }

  mod
    .service('winNotification', NotificationService)
    .run(($rootScope: ng.IRootScopeService) => {
      var kind = Windows.ApplicationModel.Activation.ActivationKind;
      Windows.UI.WebUI.WebUIApplication.onactivated = (args: any) => {
        if (args.kind != kind.toastNotification) return;
        var params: INotificationParams<any> = {
          argument: args.argument,
          inputs: args.userInput,
          timestamp: new Date()
        }
        notifications.push(params);
        $rootScope.$broadcast('win:notification', params);
      };
    });
}
