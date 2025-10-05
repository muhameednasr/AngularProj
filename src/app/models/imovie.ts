export interface Imovie {
    id: number;
  title: string;
  poster_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: { id: number; name: string }[];
  runtime?: number; // minutes
  spoken_languages?: { english_name: string }[];
  production_companies?: { name: string; logo_path?: string | null }[];
  homepage?: string;
}
