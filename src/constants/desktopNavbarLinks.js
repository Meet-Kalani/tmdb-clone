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
