import js from '@eslint/js';
import globals from 'globals';
export default [{ignores:['dist/**','node_modules/**','qa/**','.page-sync/**']},js.configs.recommended,{files:['server/**/*.mjs','scripts/**/*.mjs'],languageOptions:{globals:{...globals.node}}},{files:['src/**/*.{js,jsx}'],languageOptions:{globals:{...globals.browser},parserOptions:{ecmaVersion:'latest',sourceType:'module',ecmaFeatures:{jsx:true}}},rules:{'no-unused-vars':'off'}}];
