# Jira link commenter

This action auto comments in pull request with Jira link to it.

## Settings

`jira-project-url`

**Required** Add your jira link in ticket link format.
E.g:
`https://jira.atlassian.net/browse`

## Outputs

Creates a comment in your PR:

Jira Link: https://jira.atlassian.net/browse/JPT-1571

## Example usage

```yaml
uses: actions/jira-link-commenter@v2.3
with:
  jira-project-url: 'https://jira.atlassian.net/browse'
```

### Full example

```yaml
on: pull_request

jobs:
  example_comment_pr:
    runs-on: ubuntu-latest
    name: Auto jira link commenter
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Comment PR
        uses: sbimochan/jira-link-commenter@v2.3

        with:
          jira-project-url: https://jira.atlassian.net/browse
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Recommendations:

> Smart Commit

This makes your commits and PR summary consistent.

<a href="https://github.com/sbimochan/smart-commit" target="_blank">Check repo.</a>
