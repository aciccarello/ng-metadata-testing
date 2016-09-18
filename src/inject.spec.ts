import '../test';
import { expect } from 'chai';
import sinon = require('sinon');
import { inject } from './inject';
import { Injectable, provide } from 'ng-metadata/core';

describe('inject', () => {
  it('should run the callback function', () => {
    let spy = sinon.spy();
    inject([], spy);

    expect(spy.called).to.be.true;
  });

  it('should return an angular service', inject(['$log'], ($log: ng.ILogService) => {
    expect($log).to.have.property('log');
  }));

  it('should inject annotated services', () => {
    @Injectable()
    class MyService {}

    angular.module('test.injectService', [])
      .service(...provide(MyService));
    angular.mock.module('test.injectService');

    inject([MyService], (svc: MyService) => {
      expect(svc).to.be.instanceof(MyService);
    });
  });
});
