export const SITE_NAME = "SSC24";

export interface Settings {
  emailNotification: boolean;
  subjectsColorHighlight: boolean;
}

export const DEFAULT_SETTINGS = {
  emailNotification: true,
  subjectsColorHighlight: true,
};

export interface DBSubject {
  subjects: {
    completed: number;
    name: string;
  }[];
  userEmail: string;
}

export interface Subject {
  name: string;
  date: Date;
  day: string;
}

export const SUBJECTS: Subject[] = [
  {
    name: "Bangla 1st",
    date: new Date("15 Feb 2024"),
    day: "Thursday",
  },
  {
    name: "Bangla 2nd",
    date: new Date("18 Feb 2024"),
    day: "Sunday",
  },
  {
    name: "English 1st",
    date: new Date("20 Feb 2024"),
    day: "Tuesday",
  },
  {
    name: "English 2nd",
    date: new Date("22 Feb 2024"),
    day: "Thursday",
  },
  {
    name: "Math",
    date: new Date("25 Feb 2024"),
    day: "Sunday",
  },
  {
    name: "Religion",
    date: new Date("27 Feb 2024"),
    day: "Tuesday",
  },
  {
    name: "ICT",
    date: new Date("28 Feb 2024"),
    day: "Wednesday",
  },
  {
    name: "Home Science",
    date: new Date("29 Feb 2024"),
    day: "Thursday",
  },
  {
    name: "Agriculture",
    date: new Date("29 Feb 2024"),
    day: "Thursday",
  },
  {
    name: "Arabic",
    date: new Date("29 Feb 2024"),
    day: "Thursday",
  },
  {
    name: "Physics",
    date: new Date("3 March 2024"),
    day: "Sunday",
  },
  {
    name: "Bangladesh History",
    date: new Date("3 March 2024"),
    day: "Sunday",
  },
  {
    name: "Finance and Banking",
    date: new Date("3 March 2024"),
    day: "Sunday",
  },
  {
    name: "Chemistry",
    date: new Date("5 March 2024"),
    day: "Tuesday",
  },
  {
    name: "Civics",
    date: new Date("5 March 2024"),
    day: "Tuesday",
  },
  {
    name: "Business Entrepreneur",
    date: new Date("5 March 2024"),
    day: "Tuesday",
  },
  {
    name: "Geography and Environment",
    date: new Date("6 March 2024"),
    day: "Wednesday",
  },
  {
    name: "Biology",
    date: new Date("7 March 2024"),
    day: "Thursday",
  },
  {
    name: "Economics",
    date: new Date("7 March 2024"),
    day: "Thursday",
  },
  {
    name: "General Science",
    date: new Date("10 March 2024"),
    day: "Sunday",
  },
  {
    name: "Higher Math",
    date: new Date("10 March 2024"),
    day: "Sunday",
  },
  {
    name: "Accounting",
    date: new Date("11 March 2024"),
    day: "Monday",
  },
  {
    name: "BGS",
    date: new Date("12 March 2024"),
    day: "Tuesday",
  },
];
