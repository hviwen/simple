export default {
  description: 'create a new directory for ts',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'ts training name:',
      validate(name) {
        if (!name) {
          return 'please input name'
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
        path: `src/tsSpace/${name}/index.ts`,
        templateFile: 'plop_templates/template/tsSpace/index.ts.hbs'
      },
    ]

    return actions
  }
}