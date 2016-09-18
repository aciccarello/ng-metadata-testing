import { getInjectableName } from 'ng-metadata/core';

/**
 * Allows injecting dependencies based on their token
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
