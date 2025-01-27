import { run } from "axe-core";


run(
  document,
  {
    // for devtools element support
    elementRef: true,
    rules: {
      "color-contrast": { enabled: true },
    },
  }
).then(console.log).catch(err=> {
  throw err;
});
