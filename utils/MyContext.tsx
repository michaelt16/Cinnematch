// MovieContext.tsx

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

const MovieContext = React.createContext<MovieData[]>([]);

// Create a Context with default value undefined
export const UserContext = React.createContext<any|undefined>(undefined);



// Create a custom hook for easy access to the UserContext
export function useUser() {
  return React.useContext(UserContext);
}


export { MovieContext};

