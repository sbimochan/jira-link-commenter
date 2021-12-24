# Jira link commenter

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Settings

**Required** Add your jira link in ticket link format.
`https://jira.atlassian.net/browse`

**Required** Add your Github personal access token.

## Outputs

Creates a comment in your PR
'https://jira.atlassian.net/browse/JPT-1571'

## Example usage

```yaml
uses: actions/jira-link-commenter@v2.0
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
        uses: sbimochan/jira-link-commenter@v2.0
        
        with:
          jira-project-url: https://jira.atlassian.net/browse
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```