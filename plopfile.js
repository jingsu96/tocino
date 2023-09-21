module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name? (e.g. button)',
      },
    ],
    actions: function (data) {
      let action = [
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/src/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/components/src/component.tsx.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/src/{{pascalCase name}}.stories.tsx',
          templateFile: 'plop-templates/components/src/play.stories.tsx.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/src/{{pascalCase name}}.test.tsx',
          templateFile: 'plop-templates/components/src/component.test.tsx.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/src/index.ts',
          templateFile: 'plop-templates/components/src/index.ts.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/package.json',
          templateFile: 'plop-templates/components/package.json.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/README.md',
          templateFile: 'plop-templates/components/README.md.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/tsconfig.json',
          templateFile: 'plop-templates/components/tsconfig.json.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/CHANGELOG.md',
          templateFile: 'plop-templates/components/CHANGELOG.md.hbs',
          data: {
            componentName: data.name,
          },
        },
        {
          type: 'add',
          path: 'packages/components/{{componentName}}/src/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/components/src/component.tsx.hbs',
          data: {
            componentName: data.name,
          },
        },
      ];

      return action;
    },
  });
};
