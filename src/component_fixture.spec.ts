import '../test';
import { expect } from 'chai';
import { Component, provide } from 'ng-metadata/core';
import { ComponentFixture } from './component_fixture';

describe('ComponentFixture', () => {
  it('should initialize a component instance', () => {
    @Component({selector: 'my-component', template: '<span>My Component</span>'})
    class MyComponent {}
    registerComponent(MyComponent);

    let f = new ComponentFixture(MyComponent);

    expect(f.elementRef).to.exist;
  });

  it('should initialize the component DOM element', () => {
    @Component({selector: 'my-component', template: '<span>My Component</span>'})
    class MyComponent {}
    registerComponent(MyComponent);

    let f = new ComponentFixture(MyComponent);
    expect(f.nativeElement.nodeName.toLowerCase()).to.equal('my-component');
  });

  it('should make the component scope available', () => {
    @Component({selector: 'my-component', template: '<span>My Component</span>'})
    class MyComponent {
      compProperty = 'find me';
    }
    registerComponent(MyComponent);

    let f = new ComponentFixture(MyComponent);

    expect(f.$scope.$ctrl.compProperty).to.equal('find me');
  });

  it('should give access to the component instance', () => {
    @Component({selector: 'my-component', template: '<span>My Component</span>'})
    class MyComponent {
      returnTwo() { return 2; }
    }
    registerComponent(MyComponent);

    let f = new ComponentFixture(MyComponent);

    expect(f.componentInstance.returnTwo()).to.equal(2);
  });

  it('should cause the scope to update', () => {
    @Component({selector: 'my-component', template: '<span>Hello {{ $ctrl.name }}</span>'})
    class MyComponent {
      name = 'user';
    }
    registerComponent(MyComponent);

    let f = new ComponentFixture(MyComponent);
    f.componentInstance.name = 'world';
    f.detectChanges();

    expect(f.nativeElement.textContent.trim()).to.equal('Hello world');
  })
});


function registerComponent(component: any): void {
  angular.module('test.component', [])
    .directive(...provide(component));
  angular.mock.module('test.component');
}
