import Welcome from '../components/Welcome';
import axios from 'axios';

let count = 1;

async function getData() {
  return new Promise((resolve, reject) => {
    const list = [];

    let endpoints = [];

    for (let i = 0; i <= 5; i += 1) {
      let tmp = `https://api.themoviedb.org/3/movie/now_playing?page=`+count+`&sort_by=popularity.desc&api_key=722adeda21b5ed2867cde8f4c1d958b0`;
      endpoints.push(tmp);
      count+=1;
    }
    
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      (data) => {
         for (let i = 0; i <= 5; i += 1) {
           list.push.apply(list,data[i].data.results)
         }
        resolve(list);
      }
    );
  })
}

export default async function Home() {

    const movies = await getData();

  return (
    <Welcome 
    movies = {movies}
    />
  );
}
