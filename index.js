const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const jirProjectUrl = core.getInput('jira-project-url');
		const githubToekn = core.getInput('GITHUB_TOKEN');

		const context = github.context;
		if (context.payload.pull_request == null) {
			core.setFailed('No pull request found.');

			return;
		}
		const pullRequestNumber = context.payload.pull_request.number;
    console.log(JSON.stringify(context.payload.pull_request));
		const octokit = new github.getOctokit(githubToekn);
		await octokit.rest.issues.createComment({
			...context.repo,
			issue_number: pullRequestNumber,
			body: `Jira: ${jirProjectUrl}/JPT-123`,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
