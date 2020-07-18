const core = require('@actions/core');
const github = require('@actions/github');
const { SiteClient } = require('datocms-client');

try {
  const datocmsSiteUrl = core.getInput('datocms-site-url');
  const datocmsToken =core.getInput('datocms-token');

  const client = new SiteClient(datocmsToken);
  client.items.all({
    'page[limit]': 5,
    version: 'published'
  }).then(items => {
    console.log('->> items', items);
  });
} catch (e) {
  core.setFailed(e.message);
}
