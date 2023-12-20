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
  { type: "Bullet", name: "2+1", time: { secs: 2 + 60, increment: 60 } },
  { type: "Blitz", name: "3+0", time: { secs: 3 * 60, increment: 0 } },
  {
    type: "Blitz",
    name: "3+2",
    time: { secs: 3 * 60, increment: 2 * 60 },
  },
  { type: "Blitz", name: "5+0", time: { secs: 5 * 60, increment: 0 } },
  {
    type: "Blitz",
    name: "5+3",
    time: { secs: 5 * 60, increment: 3 * 60 },
  },
  { type: "Rapid", name: "10", time: { secs: 10 * 60, increment: 0 } },
  {
    type: "Rapid",
    name: "10+5",
    time: { secs: 10 * 60, increment: 5 * 60 },
  },
  {
    type: "Rapid",
    name: "15+10",
    time: { secs: 15 * 60, increment: 10 * 60 },
  },
  {
    type: "Classical",
    name: "30+0",
    time: { secs: 30 * 60, increment: 0 },
  },
  {
    type: "Classical",
    name: "30+20",
    time: { secs: 30 * 60, increment: 20 * 60 },
  },
  { type: "Classical", name: "Unlimited", time: { secs: 0, increment: 0 } },
];
