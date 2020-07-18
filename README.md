#  DatoCMS2md action

This action will embed DatoCms contents into Markdown.

## Inputs

### `datocms-token:`

**Required** Token of your datoCms site.enter your project administrative area (ie. http://your-project.admin.datocms.com) and go to the  Settings > API Tokens section.

### `datocms-site-url`:

**Required**  Url of your datoCms site. Like https://site-api.datocms.com/site.

### `markdown-file`:

**Required** Which file to write your content, default to `README.md`.

### `template-variable` :

**Required** Where to inject generated content, default to `{{datocms_content}}`
