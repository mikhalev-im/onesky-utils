# onesky-utils

Script to import translations from [onesky](https://oneskyapp.com).

## Configuration

Create `.env` file inside this directory and add your project information:

```
ONESKY_PROJECT_ID="11111"
ONESKY_FILE_NAME="filename.json"
ONESKY_PUBLIC_KEY="INSERT_PUBLIC_KEY"
ONESKY_SECRET_KEY="INSERT_SECRET_KEY"
```

Feel free to change `TARGET_DIR` in `index.js` to change the destination
directory where translation files will be saved.

Install dependencies by running

```
npm install
```

## Usage

To import translations run

```
npm run onesky
```

or

```
node ./index.js
```

## Workflow to add new translations

In order to add new translations or modify existing ones, please use onesky
website directly.

1. Log in into account
2. Select correct project

To add new keys:

1. In the left sidebar click `+` button next to `Files`
2. Select `Manual input`
3. Enter new key into `Phrase identifier` column (e.g. `ticket.notes.action`)
4. Enter related english translation into `Phrase`
5. Add more keys/translations
6. Click `Import phrases now`

To modify existing keys or add translations for other languages:

1. In the left sidebar click `Phrases`
2. Use search field to find the phrase by key or by phrase itself

To add translations for other languages:

1. Click `Edit phrase` on the phrase you want to update
2. Select the language you want ot update in the header
3. Update the translation
4. Click on submit button

To change the key of the phrase:

1. Click on cog icon in the right bottom corner of the phrase box
2. Click `Edit phrase ID`
3. Enter new key
4. Click `Save`

NOTE: Once you added/updated phrases, you can import them using this script. It
may take some time before your changes are available in imported files (it
takes time for onesky to process the changes).
