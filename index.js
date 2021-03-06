const fs = require('fs');
const core = require('@actions/core');
const Handlebars = require('handlebars');
const { format } = require('date-fns');

const SDK = require('@yuque/sdk');

const defaultTemplate = `
{{#each record}}
  - [{{title}} ( {{short updated_at "MM-dd"}} · {{math likes_count "*" 7}}颗稻谷)](https://yuque.com/{{@root.namespace}}/{{slug}})
{{/each}}
`;

Handlebars.registerHelper('short', function (date, formatStr = 'MMMM dd') {
  return format(new Date(date), formatStr);
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});

(async function () {
  try {
    const yuqueToken = core.getInput('yuque-token');
    const namespace = core.getInput('yuque-namespace');
    const yuqueTemplateFile = core.getInput('yuque-template-file') || '';
    const yuqueOutputFile = core.getInput('yuque-output-file') || 'README.md';
    const publicOnly = core.getInput('yuque-doc-public-only');
    const limit = core.getInput('yuque-doc-limit');
    const orderBy = core.getInput('yuque-doc-order-by');

    const client = new SDK({ token: yuqueToken });

    const docs = await client.docs.list({ namespace });
    const filteredDocs = docs.filter(doc => {
      return doc.status === 1 && (publicOnly && !!doc.public)
    })
    .sort((a, b)=> a[orderBy] - b[orderBy])
    .slice(0, limit);

    const templateContent = fs.existsSync(yuqueTemplateFile) ?  fs.readFileSync(yuqueTemplateFile, 'utf-8') : defaultTemplate;
    const fileTemplate = Handlebars.compile(templateContent);

    fs.writeFileSync(yuqueOutputFile, fileTemplate({ namespace, record: filteredDocs }));

  } catch (e) {
    core.setFailed(e.message);
  }
})();
