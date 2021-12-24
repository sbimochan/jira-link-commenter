/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 522:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 245:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(522);
const github = __nccwpck_require__(245);

async function runMain() {
  try {
    const jirProjectUrl = core.getInput('jira-project-url');
    const githubToken = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');

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
      console.log('Jira link bot comment already exists.');
      return;
    }
    const ticketNumber = grabTicket(context.payload.pull_request.title);
    if (!ticketNumber) {
      return;
    }
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pullRequestNumber,
      body: `Jira link: ${jirProjectUrl + '/' + ticketNumber}`
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function checkIfOldCommentExists(octokit, context, pullRequestNumber) {
  const commentsMeta = await octokit.rest.issues.listComments({
    ...context.repo,
    issue_number: pullRequestNumber
  });
  const isPrevComment = commentsMeta.data.some(
    (el) => el.user.login === 'github-actions[bot]'
  );
  return isPrevComment;
}

/**
 * Searches with first Ticket like structure with colon and later removes it.
 *
 * @param {string} title
 */
function grabTicket(title) {
  const ticketRegex = /^[A-Z,a-z]{2,}-\d{1,}:/g;
  const ticketIdWithColon = title.match(ticketRegex)?.[0];
  if (!ticketIdWithColon) {
    return null;
  }

  return ticketIdWithColon.slice(0, -1);
}

runMain();

})();

module.exports = __webpack_exports__;
/******/ })()
;