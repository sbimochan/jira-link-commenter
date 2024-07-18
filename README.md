# Jira link commenter

This action auto comments in pull request with Jira link to it.

> This tool can be used with other project tracking tools like ClickUp as well. Let's explore together!

## Settings

- `auto-project-url`

**Required** Add your auto link in ticket link format.
E.g:
`https://auto.atlassian.net/browse`

- `ticket-regex-title`

**Optional** You can add custom regex if your PR description seems to be different but I encourage to have same standard world wide.

#### PR summary example:

`XYZ-1234: This is an amazing feature`

## Outputs

Creates a comment in your PR:

Jira Link: https://auto.atlassian.net/browse/JPT-1571

## Example usage

`custom-comment` is (optional)

```yaml
uses: actions/auto-link-commenter@v2.4
with:
  auto-project-url: "https://auto.atlassian.net/browse"
  custom-comment: "Thank you for your contribution! :confetti_ball:"
```

### Full example

```yaml
on: pull_request

jobs:
  example_comment_pr:
    runs-on: ubuntu-latest
    name: Auto auto link commenter
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Comment PR
        uses: sbimochan/auto-link-commenter@v2.4

        with:
          auto-project-url: https://auto.atlassian.net/browse
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          custom-comment: "Thank you for your contribution! :confetti_ball:"
```

Demo:

<img width="481" alt="Screen Shot 2021-12-24 at 7 21 10 PM" src="https://user-images.githubusercontent.com/11685953/147376660-50957431-f9a8-4317-b10a-9fcce82e7b42.png">

### Recommendations:

> Ticket link appender

This is more generic and has more flexibility on prefixes and tools you use. If you want to link the ticket link in the description itself, you can check this repository.

[Check repo.](https://github.com/sbimochan/ticket-link-appender)

> Smart Commit

This makes your commits and PR summary consistent.

<a href="https://github.com/sbimochan/smart-commit" target="_blank">Check repo.</a>
