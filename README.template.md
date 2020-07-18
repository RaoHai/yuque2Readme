# Template Example

## Hi! This is My Profile.

{{#each record}}
  - [{{title}} ( {{short created_at format="MM-dd"}} * {{math likes_count "*" 7}}颗稻谷)](https://yuque.com/{{@root.namespace}}/{{slug}})
{{/each}}
