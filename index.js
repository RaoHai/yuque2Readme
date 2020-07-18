const core = require('@actions/core');
const github = require('@actions/github');
const { SiteClient } = require('datocms-client');
(async function () {
  try {
    const datocmsToken = core.getInput('datocms-token');
    const datocmsFilterModelIds = core.getInput('datocms-filter-model-ids') || '';
    const datocmsPostUrl = core.getInput('datocms-post-url') || '';

    const filterIds = datocmsFilterModelIds.split(',');

    const client = new SiteClient(datocmsToken);

    const itemTypes = (await client.itemTypes.all())
      .filter(({ apiKey }) => filterIds.length ? filterIds.includes(apiKey) : true)
      .map(({ id }) => id);

    const filterdItems = (await client.items.all({ 'page[limit]': 5, version: 'published' }))
      .filter(({ itemType }) => itemTypes.includes(itemType));

    const content = filterdItems.map(post => (
      `- [${post.title}](${datocmsPostUrl.replace(/\{\{(\w+)\}\}/g, (_, $) => (post[$]))})`
    ));

    console.log('>> content generated: ', content.join('\n'));

  } catch (e) {
    core.setFailed(e.message);
  }
})();
