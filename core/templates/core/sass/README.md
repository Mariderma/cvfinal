SASS files for the project.

To compile locally using Dart Sass (recommended):

Install dart-sass or use npx (nodejs required):

npx sass sass/main.scss css/styles.css --no-source-map --style=expanded

Or, if you have sass in PATH:

sass sass/main.scss css/styles.css --no-source-map --style=expanded

This will produce `css/styles.css` which is referenced by the templates.