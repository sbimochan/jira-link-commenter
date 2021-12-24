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

uses: actions/jira-link-commenter@v1.0
with:
  jira-project-url: 'https://jira.atlassian.net/browse'