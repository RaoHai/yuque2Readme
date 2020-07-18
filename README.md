#  DatoCMS2md action

This action will embed DatoCms contents into Markdown.

## Inputs

### `datocms-token:`

**Required** Token of your datoCms site.enter your project administrative area (ie. http://your-project.admin.datocms.com) and go to the  Settings > API Tokens section.

### `datocms-filter-model-ids`

Module IDs for generate contents, spilit by `,`.  If specified, only the content corresponding to given module ids will be generated. About module Id, see: (https://www.datocms.com/docs/content-management-api/resources/item-type).

### `datocms-template-file`

Template file for creating file.Template language is [handlebars](https://handlebarsjs.com/guide/), and generate markdown.


### `datocms-output-file`

Which file to write. Default to `README.md`


## Example

```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      # To use this repository's private action,
      # you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2
      - name: Hello world action step
        uses: ./ # Uses an action in the root directory
        id: hello
        with:
          datocms-token: ${{secrets.DATO_CMS_TOKEN}}
          datocms-output-file: README.md
          datocms-record-template: '- [{{title}} ({{short createdAt format="MMMM dd, YYYY"}})](https://buzhou.top/blogs/{{slug}})'
      - name: Result
        run: |-
          cat README.md
      - name: Commit and push if changed
        run: |-
          git add .
          git diff
          git config --global user.email "github-action-bot@example.com"
          git config --global user.name "GitHub Action Bot"
          git commit -m "Updated README" -a || echo "No changes to commit"
          git push
```
