const core = require("@actions/core");
const github = require("@actions/github");
const { runMain } = require("../main");
const { grabTicket, DEFAULT_TICKET_REGEX } = require("../ticket");

jest.mock("@actions/core");
jest.mock("@actions/github");

describe("PR title with no semicolon Ticket ID", () => {
  let context;
  let octokit;
  let logSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      payload: {
        pull_request: {
          number: 123,
          title: "TEST-123 Title without delimeter",
        },
      },
      repo: {
        owner: "owner",
        repo: "repo",
      },
    };

    octokit = {
      rest: {
        issues: {
          listComments: jest.fn().mockResolvedValue({
            data: [],
          }),
          createComment: jest.fn(),
        },
      },
    };

    github.context = context;
    github.getOctokit = jest.fn().mockReturnValue(octokit);

    core.getInput = jest.fn((name) => {
      const inputs = {
        "jira-project-url": "https://jira.example.com",
        'GITHUB_TOKEN': "gh-token",
        "custom-comment": "Thank you for your contribution!!! :confetti_ball:",
        "ticket-regex-title": "^[A-Z,a-z]{2,}-\\d{1,}",
      };
      return inputs[name];
    });

    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  test("should create a comment if no previous comment exists", async () => {
    await runMain();

    expect(core.getInput).toHaveBeenCalledWith("jira-project-url");
    expect(core.getInput).toHaveBeenCalledWith("GITHUB_TOKEN");
    expect(core.getInput).toHaveBeenCalledWith("custom-comment");
    expect(core.getInput).toHaveBeenCalledWith("ticket-regex-title");

    expect(octokit.rest.issues.createComment).toHaveBeenCalledWith({
      owner: "owner",
      repo: "repo",
      issue_number: 123,
      body: "Thank you for your contribution!!! :confetti_ball: \n Auto link: https://jira.example.com/TEST-123",
    });
  });
});
