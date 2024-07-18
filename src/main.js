const core = require("@actions/core");
const github = require("@actions/github");
const { grabTicket, DEFAULT_TICKET_REGEX } = require("./ticket");

async function runMain() {
  try {
    const jirProjectUrl = core.getInput("jira-project-url");
    const githubToken = core.getInput("GITHUB_TOKEN");
    const customComment = core.getInput("custom-comment");
    const ticketRegexRaw = core.getInput("ticket-regex-title");
    const ticketRegex = ticketRegexRaw
      ? new RegExp(ticketRegexRaw, "g")
      : DEFAULT_TICKET_REGEX;

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed("No pull request found.");

      return;
    }
    const octokit = new github.getOctokit(githubToken);
    const pullRequestNumber = context.payload.pull_request.number;
    const isPrevComment = await checkIfOldCommentExists(
      octokit,
      context,
      pullRequestNumber
    );
    if (isPrevComment) {
      console.log("Jira link bot comment already exists.");
      return;
    }
    const ticketNumber = grabTicket(
      context.payload.pull_request.title,
      ticketRegex
    );
    if (!ticketNumber) {
      return;
    }
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pullRequestNumber,
      body: `${customComment} \n Jira link: ${
        jirProjectUrl + "/" + ticketNumber
      }`,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function checkIfOldCommentExists(octokit, context, pullRequestNumber) {
  const commentsMeta = await octokit.rest.issues.listComments({
    ...context.repo,
    issue_number: pullRequestNumber,
  });
  const isPrevComment = commentsMeta.data.some(
    (el) => el.user.login === "github-actions[bot]"
  );
  return isPrevComment;
}

runMain();
module.exports = { runMain };
