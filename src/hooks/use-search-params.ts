import {parseAsString, useQueryState} from 'nuqs';

const UseSearchParams = (key: string) => {
  return useQueryState(key, parseAsString.withDefault('').withOptions({clearOnDefault: true}))
}

export default UseSearchParams