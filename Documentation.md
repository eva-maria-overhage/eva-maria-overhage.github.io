### Creating new Singleton Documents with fixed IDs

To create a Singleton Document follow these steps:
 1. Create the Schema Type for the document
 2. Create a singleton document instance
    For that you may call:
   ```shell
     npx sanity documents create --id drafts.`singleton-id` --type `document-type`
   ```
 3. Add the `singleton-id` to the `singletons` array in **sanity.config.ts**

Should something have gone wrong remove the document via:
```shell
  npx sanity documents delete drafts.`singleton-id`
```