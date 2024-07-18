const core = require('@actions/core');
const github = require('@actions/github');
const { runMain } = require('../main');
const { grabTicket, DEFAULT_TICKET_REGEX } = require('../ticket');

jest.mock('@actions/core');
jest.mock('@actions/github');

describe('GitHub Action Tests', () => {
  let context;
  let octokit;
  let logSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      payload: {
        pull_request: {
          number: 123,
          title: 'TEST-1234: Example PR title',
        },
      },
      repo: {
        owner: 'owner',
        repo: 'repo',
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
        'jira-project-url': 'https://jira.example.com',
        'GITHUB_TOKEN': 'gh-token',
        'custom-comment': 'Thank you for your contribution!!! :confetti_ball:',
      };
      return inputs[name];
    });

    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  });

  test('should create a comment if no previous comment exists', async () => {
    await runMain();

    expect(core.getInput).toHaveBeenCalledWith('jira-project-url');
    expect(core.getInput).toHaveBeenCalledWith('GITHUB_TOKEN');
    expect(core.getInput).toHaveBeenCalledWith('custom-comment');
    expect(core.getInput).toHaveBeenCalledWith('ticket-regex-title');

    expect(octokit.rest.issues.createComment).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      issue_number: 123,
      body: 'Thank you for your contribution!!! :confetti_ball: \n Jira link: https://jira.example.com/TEST-1234',
    });
  });

  test('should not create a comment if a previous comment exists', async () => {
    octokit.rest.issues.listComments.mockResolvedValue({
      data: [{ user: { login: 'github-actions[bot]' } }],
    });

    await runMain();

    expect(octokit.rest.issues.createComment).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Jira link bot comment already exists.');
  });

  test('should handle no ticket number found', async () => {
    context.payload.pull_request.title = 'No ticket in title';

    await runMain();

    expect(octokit.rest.issues.createComment).not.toHaveBeenCalled();
  });

  test('should fail if no pull request is found', async () => {
    github.context.payload.pull_request = null;

    await runMain();

    expect(core.setFailed).toHaveBeenCalledWith('No pull request found.');
  });

  test('should handle errors gracefully', async () => {
    core.getInput.mockImplementation(() => {
      throw new Error('mocked error');
    });

    await runMain();

    expect(core.setFailed).toHaveBeenCalledWith('mocked error');
  });
});
