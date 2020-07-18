const core = require('@actions/core');
const { SiteClient } = require('datocms-client');
const fs = require('fs');

(async function () {
  try {
    const datocmsToken = core.getInput('datocms-token');
    const datocmsFilterModelIds = core.getInput('datocms-filter-model-ids') || '';
    const datocmsPostUrl = core.getInput('datocms-record-template') || '';
    const datocmsTemplateFile = core.getInput('datocms-template-file') || '';
    const datocmsOutputFile = core.getInput('datocms-putput-file') || 'README.md';
    const datocmsTemplateVariable = core.getInput('datocms-template-variable');

    const filterIds = datocmsFilterModelIds.split(',');

    const client = new SiteClient(datocmsToken);

    const itemTypes = (await client.itemTypes.all())
      .filter(({ apiKey }) => filterIds.length ? filterIds.includes(apiKey) : true)
      .map(({ id }) => id);

    const filterdItems = (await client.items.all({ 'page[limit]': 5, version: 'published' }))
      .filter(({ itemType }) => itemTypes.includes(itemType));

    const content = '\n' + filterdItems.map(post => (
      datocmsPostUrl.replace(/\{\{(\w+)\}\}/g, (_, $) => (post[$]))
    )) + '\n';

    const templateContent = fs.existsSync(datocmsTemplateFile) ?  fs.readFileSync(datocmsTemplateFile, 'utf-8') : '';
    const fileContent = templateContent.replace(datocmsTemplateVariable, content);
    fs.writeFileSync(datocmsOutputFile, fileContent);
    console.log('--> generate successed', fileContent);

  } catch (e) {
    core.setFailed(e.message);
  }
})();
