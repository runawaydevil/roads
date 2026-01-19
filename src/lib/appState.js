import createQueryState from 'query-state';

const queryState = createQueryState({}, {useSearch: true});

/**
 * This is our base state. It just persists default information about
 * custom settings and integrates with query string.
 */
export default {
  isCacheEnabled() {
    // Cache habilitado por padrão, pode ser desabilitado com ?cache=0
    return queryState.get('cache') != 0;
  },
  enableCache() {
    return queryState.unset('cache');
  },
  disableCache() {
    return queryState.set('cache', 0);
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