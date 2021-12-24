const core = require('@actions/core');
const github = require('@actions/github');

/**
 * Searches with first Ticket like structure with colon and later removes it.
 *
 * @param {string} title
 */
function grabTicket(title) {
  const ticketRegex = /[A-Z,a-z]{2,}-\d{2,}:/s;
  const ticketIdWithColon = title.match(ticketRegex)[0];
  if (!ticketIdWithColon) {
    return null;
  }

  return ticketIdWithColon.slice(0,-1);
}

async function run() {
	try {
		const jirProjectUrl = core.getInput('jira-project-url');
		const githubToken = core.getInput('GITHUB_TOKEN');

		const context = github.context;
		if (context.payload.pull_request == null) {
			core.setFailed('No pull request found.');

			return;
		}
		const pullRequestNumber = context.payload.pull_request.number;
    const ticketNumber = grabTicket(context.payload.pull_request.title)
    if (!ticketNumber) {
      return;
    }
		const octokit = new github.getOctokit(githubToken);
		await octokit.rest.issues.createComment({
			...context.repo,
			issue_number: pullRequestNumber,
			body: `Jira link: ${jirProjectUrl + '/' + ticketNumber}`,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
