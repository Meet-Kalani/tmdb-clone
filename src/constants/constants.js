export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const WATCH_PROVIDER_LOGO_BASE_URL = "https://image.tmdb.org/t/p/original";

export const BACKDROP_BASE_URL = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const CAST_PROFILE_BASE_URL = "https://www.themoviedb.org/t/p/w138_and_h175_face";

export const REVIEWER_PROFILE_BASE_URL = "https://media.themoviedb.org/t/p/w45_and_h45_face";

export const RECOMMENDATION_BASE_URL = "https://media.themoviedb.org/t/p/w250_and_h141_face";

export const NETWORKS_LOGO_BASE_URL = "https://image.tmdb.org/t/p/h30";

export const CURRENT_SEASON_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w130_and_h195_bestv2";

export const MOBILE_PRIMARY_NAVLINK_DATA = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Top Rated", href: "#" },
      { id: 3, label: "Upcoming", href: "#" },
      { id: 4, label: "Now Playing", href: "#" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Top Rated", href: "#" },
      { id: 3, label: "On TV", href: "#" },
      { id: 4, label: "Airing Today", href: "#" },
    ],
  },
  {
    id: 3,
    label: "People",
    href: "#",
    nestedLinks: [{ id: 1, label: "Popular People", href: "#" }],
  },
];

export const MOBILE_SECONDARY_NAVLINK_DATA = [
  { id: 1, label: "Contribution Bible", href: "#" },
  { id: 2, label: "Discussions", href: "#" },
  { id: 3, label: "Leaderboard", href: "#" },
  { id: 4, label: "API", href: "#" },
  { id: 5, label: "Support", href: "#" },
  { id: 6, label: "About", href: "#" },
];

export const DESKTOP_PRIMARY_NAVLINK_DATA = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Now Playing", href: "#" },
      { id: 3, label: "Upcoming", href: "#" },
      { id: 4, label: "Top Rated", href: "#" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "#" },
      { id: 2, label: "Airing Today", href: "#" },
      { id: 3, label: "On TV", href: "#" },
      { id: 4, label: "Top Rated", href: "#" },
    ],
  },
  {
    id: 3,
    label: "People",
    href: "#",
    nestedLinks: [{ id: 1, label: "Popular People", href: "#" }],
  },
  {
    id: 4,
    label: "More",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Discussions", href: "#" },
      { id: 2, label: "Leaderboard", href: "#" },
      { id: 3, label: "Support", href: "#" },
      { id: 4, label: "API", href: "#" },
    ],
  },
];

export const DESKTOP_CTA_NAVLINK_DATA = [
  { id: 2, label: "EN", href: "#" },
  { id: 3, label: "Login", href: "#" },
  { id: 4, label: "Join TMDB", href: "#" },
];

export const CONTENT_TYPE = {
  TV: "tv",
  MOVIE: "movie",
};

export const TIME_WINDOW = {
  DAY: 'day',
  WEEK: "week",
};
