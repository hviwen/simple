import {ofetch} from 'ofetch';

export function createRequest(options) {
  return ofetch.create(options);
}

export default createRequest;
