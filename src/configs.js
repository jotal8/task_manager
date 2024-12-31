const CONFIG = {
    jsDocs: {
      apis: ['./src/app/api/**/route.ts'],
      swaggerDefinition: {
        info: {
          title: 'Task Manager',
          version: '0.0.1',
          description: 'This is an API doc for Task Manager.',
        },
      },
    },
  };
  
  export default CONFIG;