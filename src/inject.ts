import { getInjectableName } from 'ng-metadata/core';

/**
 * Allows injecting dependencies based on their token
 * @param tokens Array of injectable classes or string service names as registered with angular
 * @param fn Callback fn to run with parameters matching the tokens Array
 * @return angular.mock.inject called with the callback fn
 */
export function inject(tokens: any[], fn: Function): () => any {
  let injectableNames = tokens.map((token) => {
    if (angular.isString(token)) {
      return token;
    } else {
      return getInjectableName(token);
    }
  });

  fn.$inject = injectableNames;

  return angular.mock.inject(fn);
}
