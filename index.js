const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const jirProjectUrl = core.getInput('jira-project-url');
		const github_token = core.getInput('GITHUB_TOKEN');

		const context = github.context;
		if (context.payload.pull_request == null) {
			core.setFailed('No pull request found.');
			return;
		}
		const pull_request_number = context.payload.pull_request.number;

		const octokit = new github.getOctokit(github_token);
		const new_comment = octokit.rest.issues.createComment({
			...context.repo,
			issue_number: pull_request_number,
			body: `Jira: ${jirProjectUrl}/JPT-123`,
		});
    console.log(new_comment)
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
