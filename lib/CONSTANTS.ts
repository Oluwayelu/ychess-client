import { Computer, TimeControl } from "./types";

export const computer: Computer[] = [
  {
    name: "Carl",
    level: "Beginner",
    engineLevel: 5,
    avatar: "/avatar/man_1.png",
    description:
      "Carl is a beginner player who started playing at the age of 20.",
  },
  {
    name: "David",
    level: "Intermediate",
    engineLevel: 12,
    avatar: "/avatar/man_3.png",
    description:
      "David is an intermediate player. David has won 2 local tournament in his city.",
  },
  {
    name: "Joan",
    level: "Expert",
    engineLevel: 20,
    avatar: "/avatar/woman_1.png",
    description:
      "Joan or porpularly known as GM Joan has been playing chess from the age of 5years. She has one over 150 tournaments local and internatinally.",
  },
];

export const timeControl: TimeControl[] = [
  { type: "Bullet", name: "1+0", time: { secs: 60, increment: 0 } },
  { type: "Bullet", name: "2+1", time: { secs: 2 + 60, increment: 1 } },
  { type: "Blitz", name: "3+0", time: { secs: 3 * 60, increment: 0 } },
  {
    type: "Blitz",
    name: "3+2",
    time: { secs: 3 * 60, increment: 2 },
  },
  { type: "Blitz", name: "5+0", time: { secs: 5 * 60, increment: 0 } },
  {
    type: "Blitz",
    name: "5+3",
    time: { secs: 5 * 60, increment: 3 },
  },
  { type: "Rapid", name: "10", time: { secs: 10 * 60, increment: 0 } },
  {
    type: "Rapid",
    name: "10+5",
    time: { secs: 10 * 60, increment: 5 },
  },
  {
    type: "Rapid",
    name: "15+10",
    time: { secs: 15 * 60, increment: 10 },
  },
  {
    type: "Classical",
    name: "30+0",
    time: { secs: 30 * 60, increment: 0 },
  },
  {
    type: "Classical",
    name: "30+20",
    time: { secs: 30 * 60, increment: 20 },
  },
  { type: "Classical", name: "Unlimited", time: { secs: 0, increment: 0 } },
];

export const games = [
  [
    "e2e4",
    "e7e5",
    "g1f3",
    "b8c6",
    "f1b5",
    "a7a6",
    "b5a4",
    "g8f6",
    "e1g1",
    "f8e7",
    "f1e1",
    "b7b5",
    "a4b3",
    "d7d6",
    "c2c3",
    "e8g8",
    "h2h3",
    "c8b7",
    "d2d4",
    "c6b8",
    "b1d2",
    "f6d7",
    "d4e5",
    "d6e5",
    "d2f1",
    "d7c5",
    "b3c2",
    "d8d1",
    "e1d1",
    "a6a5",
    "b2b4",
    "c5d7",
    "a2a3",
    "c7c5",
    "c1d2",
  ],
  [
    "e2e4",
    "c7c5",
    "g1f3",
    "d7d6",
    "d2d4",
    "c5d4",
    "f3d4",
    "g8f6",
    "b1c3",
    "a7a6",
    "f1e2",
    "e7e6",
    "e1g1",
    "b8c6",
    "c1e3",
    "f8e7",
    "f2f4",
    "e8g8",
    "a2a4",
    "d8c7",
    "d1e1",
    "b7b6",
    "g1h1",
  ],
];
