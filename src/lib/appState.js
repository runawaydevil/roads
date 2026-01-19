import createQueryState from 'query-state';

const queryState = createQueryState({}, {useSearch: true});

/**
 * This is our base state. It just persists default information about
 * custom settings and integrates with query string.
 */
export default {
  isCacheEnabled() {
    // Cache desabilitado por padrão devido a problemas de acesso ao CloudFront
    return queryState.get('cache') == 1;
  },
  enableCache() {
    return queryState.set('cache', 1);
  },
  disableCache() {
    return queryState.unset('cache');
  },
  get() {
    return queryState.get.apply(queryState, arguments);
  },
  set() {
    return queryState.set.apply(queryState, arguments);
  },
  unset() {
    return queryState.unset.apply(queryState, arguments);
  },

  unsetPlace() {
    queryState.unset('areaId');
    queryState.unset('osm_id');
    queryState.unset('bbox');
  }
}