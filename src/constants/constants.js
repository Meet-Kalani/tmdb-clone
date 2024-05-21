export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const POSTER_URL = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";

export const WATCH_PROVIDER_LOGO_BASE_URL = "https://image.tmdb.org/t/p/original";

export const BACKDROP_BASE_URL = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const CAST_PROFILE_BASE_URL = "https://www.themoviedb.org/t/p/w138_and_h175_face";

export const REVIEWER_PROFILE_BASE_URL = "https://media.themoviedb.org/t/p/w45_and_h45_face";

export const RECOMMENDATION_BASE_URL = "https://media.themoviedb.org/t/p/w250_and_h141_face";

export const NETWORKS_LOGO_BASE_URL = "https://image.tmdb.org/t/p/h30";

export const CURRENT_SEASON_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w130_and_h195_bestv2";

export const LOADER_MALE = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

export const LOADER_FEMALE = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";

export const FACEBOOK_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg";

export const TWITTER_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg";

export const INSTAGRAM_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg";

export const LINK_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg";

export const LIST_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-159-thumbnails-list-white-c260ea972eebf812289fd3c41d0d2c1dff33ecbcd62be13fba8eeaf9de173789.svg";

export const LIKE_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg";

export const BOOKMARK_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-73-bookmark-white-432e98d550b7e4c80b06272c49475b0db85a60f6fae450420713004b3c9d3ffd.svg";

export const PLAY_ICON = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg";

export const WOMAN_GENDER_ID = 1;

export const FLAG_BASE_URL = 'https://raw.githubusercontent.com/SujalShah3234/All-Country-Flags/master';

export const MOBILE_PRIMARY_NAVLINK_DATA = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "/movie/category/popular" },
      { id: 4, label: "Top Rated", href: "/movie/category/top_rated" },
      { id: 3, label: "Upcoming", href: "/movie/category/upcoming" },
      { id: 2, label: "Now Playing", href: "/movie/category/now_playing" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "/tv/category/popular" },
      { id: 4, label: "Top Rated", href: "/tv/category/top_rated" },
      { id: 3, label: "On TV", href: "/tv/category/on_the_air" },
      { id: 2, label: "Airing Today", href: "/tv/category/airing_today" },
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
      { id: 1, label: "Popular", href: "/movie/category/popular" },
      { id: 2, label: "Now Playing", href: "/movie/category/now_playing" },
      { id: 3, label: "Upcoming", href: "/movie/category/upcoming" },
      { id: 4, label: "Top Rated", href: "/movie/category/top_rated" },
    ],
  },
  {
    id: 2,
    label: "TV Shows",
    href: "#",
    nestedLinks: [
      { id: 1, label: "Popular", href: "/tv/category/popular" },
      { id: 2, label: "Airing Today", href: "/tv/category/airing_today" },
      { id: 3, label: "On TV", href: "/tv/category/on_the_air" },
      { id: 4, label: "Top Rated", href: "/tv/category/top_rated" },
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
