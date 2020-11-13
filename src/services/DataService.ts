import { ajax } from 'rxjs/ajax';

export default class DataService {
  fetchData<T>(endpoint: string) {
    return ajax.getJSON<T>(`https://jsonplaceholder.typicode.com/${endpoint}`);
  }
}