# Template Example

## Hi! This is My Profile.

{{#each record}}
  - [{{title}} ({{short created_at format="MMMM dd, YYYY"}})](https://yuque.com/{{namespace}}/{{slug}})
{{/each}}
