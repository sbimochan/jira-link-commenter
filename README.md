# Jira link commenter

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Settings

**Required** Add your jira link in ticket link format.
`https://jira.atlassian.net/browse`

## Outputs

It appends ticket number to the link
'https://jira.atlassian.net/browse/JPT-1571'

The time we greeted you.

## Example usage

uses: actions/jira-link-commenter@v1.0
with:
  jira-project-url: 'https://jira.atlassian.net/browse'