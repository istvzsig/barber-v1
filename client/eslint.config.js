import pluginVue from 'eslint-plugin-vue';

export default [
  {
    // Base config for Vue
    ...pluginVue.configs['essential'],
    files: ['**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3, // maximum 3 attributes per line in a single-line element
          multiline: { max: 1 }, // maximum 1 attribute per line in a multiline element
        },
      ],
    },
  },
];
