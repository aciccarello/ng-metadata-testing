import '../test';
import { expect } from 'chai';

describe('globals', () => {
  it('should define angular', () => {
    expect(angular).to.exist;
  });

  it('should define angular mocks', () => {
    expect(angular.mock).to.exist;
  });

  it('should define reflect metadata', () => {
    expect(Reflect).to.exist;
  });
});
