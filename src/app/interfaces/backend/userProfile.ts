interface City {
  city: string;
  state: string;
}

export interface UserProfile {
  userName: string;
  email: string;
  avatar: string;
  highScore: number;
  citiesPlayed: City[];
}
