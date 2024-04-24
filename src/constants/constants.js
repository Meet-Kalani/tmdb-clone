export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL =
  "https://media.themoviedb.org/t/p/w220_and_h330_face";

export const mobilePrimaryNavlinkData = [
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

export const mobileSecondaryNavlinkData = [
  { id: 1, label: "Contribution Bible", href: "#" },
  { id: 2, label: "Discussions", href: "#" },
  { id: 3, label: "Leaderboard", href: "#" },
  { id: 4, label: "API", href: "#" },
  { id: 5, label: "Support", href: "#" },
  { id: 6, label: "About", href: "#" },
];

export const desktopPrimaryNavlinkData = [
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

export const desktopCTANavlinkData = [
  // {
  //   id: 1,
  //   label: (
  //     <img
  //       src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg"
  //       width={22}
  //     />
  //   ),
  //   href: "#",
  // },
  { id: 2, label: "EN", href: "#" },
  { id: 3, label: "Login", href: "#" },
  { id: 4, label: "Join TMDB", href: "#" },
  // {
  //   id: 5,
  //   label: (
  //     <img
  //       src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
  //       width={29}
  //     />
  //   ),
  //   href: "#",
  // },
];
