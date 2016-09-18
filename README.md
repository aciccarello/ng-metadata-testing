# ng-metadata-testing
Testing utilities for ng-metadata to match Angular 2

## 
See [ngParty/ng-metadata#93](https://github.com/ngParty/ng-metadata/issues/93)

## ng-metadata-testing API

## ComponentFixture (partially implemented)
```TypeScript
/**
 * Fixture for debugging and testing a component.
 */
export declare class ComponentFixture<T> {
    /** not implemented */
    componentInstance: T;
    
    /** The native HTML element at the root of the component */
    nativeElement: HTMLElement;

    /** The jQuery wrapped element */
    elementRef: ng.IAugmentedJQuery;

    /** $scope of the component */
    $scope: ComponentScope<T>;

    constructor(componentRef: {
        new (): T;
    });

    /** Trigger a change detection cycle */
    detectChanges(): void;

    /** Not implemented yet */
    destroy(): void;
}

/**
 * Scope of the component instance with the `$ctrl` property typed
 */
export interface ComponentScope<T> extends ng.IScope {
    $ctrl: T;
}
```


## inject (implemented)
```TypeScript
/**
 * Allows injecting dependencies based on their token
 * @param tokens Array of injectable classes or string service names as registered with angular
 * @param fn Callback fn to run with parameters matching the tokens Array
 * @return angular.mock.inject called with the callback fn
 */
export declare function inject(tokens: any[], fn: Function): () => any;
```

- TestBed (not implemented)
