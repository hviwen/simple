export default {
  description: 'create a training framework',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'framework name:',
      validate(name) {
        if (!name) {
          return 'please input framework name'
        }
        return true
      }
    }
  ],
  actions: (data) => {
    const name = "{{name}}";

    let actions = [
      {
        type: 'add',
        path: `src/vue-ground/src/framework/${name}/index.js`,
        templateFile: 'plop_templates/template/framework/index.js.hbs'
      },
    ]

    return actions
  }
}