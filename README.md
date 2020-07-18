#  Yuque2Readme action

This action will embed contents of yuque into `README.md` .

## Inputs

### `yuque-token`

**Required** 语雀的 token，去 https://www.yuque.com/settings/tokens 里找。需要读取你的知识库和文档

### `namespace`

**Required** 空间标识。比如语雀的博客： `yuque/blog`

### `yuque-template-file`

模板文件名。语法是 [handlebars](https://handlebarsjs.com/guide/)，生成 markdown。

### `yuque-output-file`

输出文件名。默认是写到 `README.md`


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
          yuque-token: ${{secrets.YUQUE_TOKEN}}
          yuque-namespace: 'luchen/buzhou'
          yuque-output-file: README.output.md
          yuque-record-template: '- [{{title}} ({{short createdAt format="MMMM dd, YYYY"}})](https://yuque.com/{{namespace}}/{{slug}})'
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
