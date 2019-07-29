# serverless-plugin-catdir
Allows serverless stacks to import text from a file or multiple files which will import in a string format.  This plugin solves
a problem when importing files with new lines that it maintains formatting.  This plugin also allows the user to remove

## Use case
When importing step function json, this function allows you to have a single or multiple files which contains step
function tasks, and retrieve their values with formatting for inclusion in a serverless deployment.

# Implementing

Install the plugin into the directory your serverless.yml is located
``` bash
npm install serverless-plugin-catdir
```

Add the decouple plugin to your plugins, and add a custom variable to turn it on
```yaml
plugins:
    - serverless-plugin-catdir

custom:
    fileContent: "#catdir(./path/to/file.txt)"
    fileMaskContent: "#catdir(./path/to/*.txt)"
    fileWithoutFirstAndLastLine: "#catdir(./path/to/*.txt,true)"
```

