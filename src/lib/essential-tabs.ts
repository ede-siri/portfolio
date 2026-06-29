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
    description: "currently in an elo downward spiral, but still convinced the comeback is coming.",
    status: "BLUNDER RECOVERY IN PROGRESS",
  },
  {
    id: "badminton",
    mode: "Cardio Mode",
    path: "/badminton",
    title: "Badminton",
    description: "thursday and friday rallies, dramatic lunges, and pretending I’m not out of breath.",
    status: "WEEKLY RALLY SCHEDULED",
  },
  {
    id: "stocks",
    mode: "Volatility Mode",
    path: "/stocks",
    title: "Stocks",
    description: "checking my portfolio every second like the market is personally texting me.",
    status: "WATCHLIST TOO LONG",
  },
  {
    id: "travel",
    mode: "Flight Mode",
    path: "/travel",
    title: "Travel",
    description: "one tiktok video and suddenly I’m checking flights, hotels, and visa requirements.",
    status: "NEXT TRIP LOADING",
  },
];
