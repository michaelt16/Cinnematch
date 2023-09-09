// MyContext.tsx
import React from 'react';

interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface UserInfo{
  username:string,
  icon:string,
}

const MyContext = React.createContext<MovieData[]>([]);

const defaultValue: UserInfo = { username: 'ttt', icon: '' };
const UserContext = React.createContext<UserInfo>(defaultValue);


export { MyContext, UserContext };

