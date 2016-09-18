import { ComponentMetadata } from 'ng-metadata/src/core/directives';
import { reflector } from 'ng-metadata/src/core/reflection/reflection';

/**
 * Fixture for debugging and testing a component.
 */
export class ComponentFixture<T> {
  /** Instance of the component from the scope */
  componentInstance: T;

  /** The native HTML element at the root of the component */
  nativeElement: HTMLElement;

  /** The jQuery wrapped element */
  elementRef: ng.IAugmentedJQuery;

  /** $scope of the component */
  $scope: ComponentScope<T>;

  constructor(componentRef: { new(): T }) {
    this.compileTemplate(componentRef);
  }

  /** Trigger a change detection cycle */
  detectChanges(): void {
    this.$scope.$apply();
  }

  /** Not implemented yet */
  destroy(): void {
    throw new Error('Method not implemented yet');
  }

  private compileTemplate(componentRef: any) {
    let [annotation] = reflector.annotations( componentRef );
    let selector = (<ComponentMetadata> annotation).selector;
    let template = `<${selector}></${selector}>`;

    angular.mock.inject(($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) => {
      let parentScope = $rootScope.$new();
      this.elementRef = $compile(template)(parentScope);
      this.nativeElement = this.elementRef[0];

      let insideComponent = this.nativeElement.children.item(0);
      this.$scope = <ComponentScope<T>> angular.element(insideComponent).scope();
      this.componentInstance = this.$scope.$ctrl;
    });
  }
}

/**
 * Scope of the component instance with the `$ctrl` property typed
 */
export interface ComponentScope<T> extends ng.IScope {
  $ctrl: T;
}
