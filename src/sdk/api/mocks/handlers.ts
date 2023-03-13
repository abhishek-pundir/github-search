import { rest } from "msw";
import {
  GITHUB_USER_SEARCH_URL,
  GITHUB_USER_PROFILE_URL,
} from "../../constants";

export const handlers = [
  // GET User Search
  rest.get(GITHUB_USER_SEARCH_URL, (req, res, ctx) => {
    const responseData = {
      total_count: 2,
      items: [
        {
          id: 1,
          login: "user1",
          avatar_url: "https://avatar1.com",
        },
        {
          id: 2,
          login: "user2",
          avatar_url: "https://avatar2.com",
        },
      ],
    };

    return res(ctx.status(200), ctx.json(responseData));
  }),

  // GET User Profile
  rest.get(GITHUB_USER_PROFILE_URL + ":username", (req, res, ctx) => {
    const responseData = {
      avatar_url: "https://avatar.com",
      html_url: "https://github.com/sample",
      name: "Abhishek",
      login: "abhishek-pundir",
      bio: "A software developer",
      public_repos: 10,
      following: 20,
      followers: 30,
      company: "Sample",
      location: "Test",
      twitter_username: "abhishektwitter",
      blog: "https://abhishekpundir.com",
    };

    return res(ctx.status(200), ctx.json(responseData));
  }),

  // GET User Repositories
  rest.get(`${GITHUB_USER_PROFILE_URL}:username/repos`, (req, res, ctx) => {
    const responseData = [
      { id: 1, name: "Repo 1" },
      { id: 2, name: "Repo 2" },
    ];

    return res(ctx.status(200), ctx.json(responseData));
  }),
];
