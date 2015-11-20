namespace Demo {

  interface IScope extends ng.IScope {
    path: string;
  }

  class Controller {
    title: string;
    description: string;
    include: string;
    selectedFile: string;
    files: {mode: string, name: string, content: string}[];

    constructor(
      $scope: IScope,
      CacheFactory: any
    ) {
      var cache = CacheFactory.get('examples');
      var details = JSON.parse(cache.get($scope.path + '/sample.json'))
      this.title = details.title;
      this.description = details.description;
      this.include = $scope.path + '/sample.html';
      this.files = _(<string[]>cache.keys())
        .filter(k => _.startsWith(k, $scope.path) && !_.endsWith(k, '.json'))
        .map(k => { return {
          mode: this.getFileType(k).toLowerCase(),
          name: this.getFileType(k),
          content: cache.get(k)
        }})
        .value();
      this.selectedFile = this.files.length? this.files[0].mode : '';
    }

    selectFile(mode: string) {
      this.selectedFile = mode;
    }

    aceLoaded(editor: AceAjax.Editor) {
      editor.setReadOnly(true);
      editor.getSession().setUseWorker(false);
      editor.setFontSize('14px');
      editor.setShowFoldWidgets(false);
      editor.setShowPrintMargin(false);
      editor.setHighlightActiveLine(false);
      editor.$blockScrolling = Infinity;
    }

    getFileType(fileName: string) {
      switch(_.last(fileName.split('.')).toLowerCase()) {
        case 'html':
          return 'HTML';
        case 'ts':
          return 'TypeScript';
        case 'xml':
          return 'XML';
        default:
          return '';
      }
    }
  }

  app.directive('example', () => {
    return {
      restrict: 'E',
      templateUrl: 'example/example.html',
      scope: {
        path: '@'
      },
      controllerAs: 'vm',
      controller: Controller
    }
  })
}