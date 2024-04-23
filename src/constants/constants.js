export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL =
  "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const primaryNavlinkData = [
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

export const secondaryNavlinkData = [
  { id: 1, label: "Contribution Bible", href: "#" },
  { id: 2, label: "Discussions", href: "#" },
  { id: 3, label: "Leaderboard", href: "#" },
  { id: 4, label: "API", href: "#" },
  { id: 5, label: "Support", href: "#" },
  { id: 6, label: "About", href: "#" },
];