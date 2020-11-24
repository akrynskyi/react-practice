import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../store/reducers/usersReducer';

const FB_DB = 'https://grid-data-test.firebaseio.com';
const JSONP = 'https://jsonplaceholder.typicode.com/';

export default class DataService {
  fetchData<T>(endpoint: string) {
    return ajax.getJSON<T>(`${JSONP}${endpoint}`);
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

  fetchAllUsers() {
    return ajax.get(`${FB_DB}/users.json`).pipe(
      map(
        ({ response }) => response
          ? Object.keys(response).map((key) => ({...response[key], id: key} as User))
          : []
      )
    );
  }

  addUser(body: User) {
    return ajax.post(`${FB_DB}/users.json`, JSON.stringify(body)).pipe(
      map(({ response }) => (response as User))
    );
  }

  updateUser(body: User) {
    return ajax.put(`${FB_DB}/users/${body.id}.json`, JSON.stringify(body)).pipe(
      map(({ response }) => (response as User))
    );
  }

}