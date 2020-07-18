const fs = require('fs');
const core = require('@actions/core');
const Handlebars = require('handlebars');
const { format } = require('date-fns');

const { SiteClient } = require('datocms-client');

const defaultTemplate = `
{{#each record}}
  - [{{title}} ({{short createdAt format="MMMM dd, YYYY"}})](https://buzhou.top/blogs/{{slug}})
{{/each}}
`;

Handlebars.registerHelper('short', function (date, options) {
  return format(new Date(date), options && options.format || 'MMMM dd');
});

(async function () {
  try {
    const datocmsToken = core.getInput('datocms-token');
    const datocmsFilterModelIds = core.getInput('datocms-filter-model-ids') || '';
    const datocmsTemplateFile = core.getInput('datocms-template-file') || '';
    const datocmsOutputFile = core.getInput('datocms-output-file') || 'README.md';

    const filterIds = datocmsFilterModelIds.split(',');

    const client = new SiteClient(datocmsToken);

    const itemTypes = (await client.itemTypes.all())
      .filter(({ apiKey }) => filterIds.length ? filterIds.includes(apiKey) : true)
      .map(({ id }) => id);

    const filterdItems = (await client.items.all({ 'page[limit]': 5, version: 'published' }))
      .filter(({ itemType }) => itemTypes.includes(itemType));

    const templateContent = fs.existsSync(datocmsTemplateFile) ?  fs.readFileSync(datocmsTemplateFile, 'utf-8') : defaultTemplate;
    const fileTemplate = Handlebars.compile(templateContent);

    fs.writeFileSync(datocmsOutputFile, fileTemplate({ record: filterdItems }));

  } catch (e) {
    core.setFailed(e.message);
  }
})();
