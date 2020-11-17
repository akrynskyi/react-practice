import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export default class DataService {
  fetchData<T>(endpoint: string) {
    return ajax.getJSON<T>(`https://jsonplaceholder.typicode.com/${endpoint}`);
  }

  fetchMockData<T>() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return fromFetch('./mock/users.json', { headers })
      .pipe(
        switchMap<Response, Promise<T>>((res) => res.json()),
      );
  }
}