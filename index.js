const fs = require('fs');
const core = require('@actions/core');
const Handlebars = require('handlebars');
const { format } = require('date-fns');

const { SiteClient } = require('datocms-client');

Handlebars.registerHelper('short', function (date, options) {
  return format(new Date(date), options && options.format || 'MMMM dd');
});

(async function () {
  try {
    const datocmsToken = core.getInput('datocms-token');
    const datocmsFilterModelIds = core.getInput('datocms-filter-model-ids') || '';
    const datocmsRecordTemplate = core.getInput('datocms-record-template') || '';
    const datocmsTemplateFile = core.getInput('datocms-template-file') || '';
    const datocmsOutputFile = core.getInput('datocms-output-file') || 'README.md';
    const datocmsTemplateVariable = core.getInput('datocms-template-variable');

    const filterIds = datocmsFilterModelIds.split(',');

    const client = new SiteClient(datocmsToken);

    const itemTypes = (await client.itemTypes.all())
      .filter(({ apiKey }) => filterIds.length ? filterIds.includes(apiKey) : true)
      .map(({ id }) => id);

    const filterdItems = (await client.items.all({ 'page[limit]': 5, version: 'published' }))
      .filter(({ itemType }) => itemTypes.includes(itemType));

    const contentTemplate = Handlebars.compile(datocmsRecordTemplate);

    const content = '\n' + filterdItems.map(post => contentTemplate(post)).join('\n') + '\n';

    const templateContent = fs.existsSync(datocmsTemplateFile) ?  fs.readFileSync(datocmsTemplateFile, 'utf-8') : '';

    const fileContent = templateContent.replace(datocmsTemplateVariable, content);
    fs.writeFileSync(datocmsOutputFile, fileContent);

  } catch (e) {
    core.setFailed(e.message);
  }
})();
