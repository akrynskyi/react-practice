import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../store/reducers/usersReducer';

const { REACT_APP_FB_DATABASE_URL: FB_DB } = process.env;
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

  updateManyUsers(users: User[]) {
    const body = users.reduce((body, user) => {
      body[user.id] = user;
      return body;
    }, {} as { [key: string]: User });

    return ajax.patch(`${FB_DB}/users.json`, JSON.stringify(body)).pipe(
      tap(({ response }) => console.log(response))
    );
  }

}