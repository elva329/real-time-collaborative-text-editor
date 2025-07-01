import {parseAsString, useQueryState} from 'nuqs';

const UseSearchParams = () => {
  return useQueryState('search', parseAsString.withDefault('').withOptions({clearOnDefault: true}))
}

export default UseSearchParams