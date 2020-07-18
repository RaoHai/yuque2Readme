#  DatoCMS2md action

This action will embed DatoCms contents into Markdown.

datocms-token: # token of datoCms
    description: 'Token of your datoCms site.enter your project administrative area (ie. http://your-project.admin.datocms.com) and go to the  Settings > API Tokens section.'
    required: true
    default: 'OOXXOOXX'
  datocms-filter-model-ids:
    description: 'Module IDs for generate contents, spilit by `,`. (https://www.datocms.com/docs/content-management-api/resources/item-type)'
    required: false
    default: 'blog'
  datocms-record-template:
    description: 'template to generate each line.'
    required: true
    default: '- [{{title}}](http://localhost/blogs/{{slug}})'
  datocms-output-file:
    description: 'Which file to write'
    default: 'README.md'
  datocms-template-file:
    description: 'Template for generate output'
    default: 'README.template.md'
  datocms-template-variable:
    description: 'Where to inject generated content'
    default: '{{datocms_content}}'

## Inputs

### `datocms-token:`

**Required** Token of your datoCms site.enter your project administrative area (ie. http://your-project.admin.datocms.com) and go to the  Settings > API Tokens section.

### `datocms-filter-model-ids`

Module IDs for generate contents, spilit by `,`.  If specified, only the content corresponding to given module ids will be generated. About module Id, see: (https://www.datocms.com/docs/content-management-api/resources/item-type).

### `datocms-template-file`

Template file for creating file.Template language is [handlebars](https://handlebarsjs.com/guide/), and generate markdown.


### `datocms-output-file`

Which file to write. Default to `README.md`

