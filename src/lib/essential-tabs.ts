export type EssentialTab = {
  id: string;
  mode: string;
  path: string;
  title: string;
  description: string;
  status: string;
};

export const essentialTabs: EssentialTab[] = [
  {
    id: "chess",
    mode: "Strategy Mode",
    path: "/chess",
    title: "Chess",
    description: "thinking three moves ahead. blundering on move two.",
    status: "OPENING THEORY PENDING",
  },
  {
    id: "badminton",
    mode: "Cardio Mode",
    path: "/badminton",
    title: "Badminton",
    description: "cardio with dramatic lunges and personal vendettas.",
    status: "RALLY SURVIVAL IMPROVING",
  },
  {
    id: "stocks",
    mode: "Volatility Mode",
    path: "/stocks",
    title: "Stocks",
    description: "checking my portfolio like the market owes me an apology.",
    status: "WATCHLIST TOO LONG",
  },
  {
    id: "travel",
    mode: "Flight Mode",
    path: "/travel",
    title: "Travel",
    description: "one scenic TikTok and suddenly I'm checking flights.",
    status: "HOTELS TAB OPEN",
  },
];
