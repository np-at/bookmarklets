import {run} from "axe-core"


run(document, {
    rules: {
        "color-contrast": {enabled: true},
    }
}, (err, results) => {
    if (err) throw err;
    console.log(results);
})
