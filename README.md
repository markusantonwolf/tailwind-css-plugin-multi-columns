# Tailwind CSS Plugin for Multi Column Layout

The CSS multi-column layout allows easy definition of multiple columns of text - just like in newspapers. This Tailwind CSS plugin adds utilities for you to use all multi-column properties.

**Compatibility: Tailwind CSS ^1.8.3, ^2.X. and ^3.X**

## Quick start - only for development / testing

For a quick start you can use the following link to start with all utilities. Please don't use this link in youre production environment. For a good developer experience install the plugin and add it to your tailwind.config.js - see [Installation](#user-content-installation).

```html
<link href="https://cdn.jsdelivr.net/gh/markusantonwolf/tailwind-css-plugin-multi-columns/dist/multi-columns.min.css" rel="stylesheet">
```

## Installation

### 1. Install the Tailwind CSS Multi Column plugin:

```bash
# Install using npm
npm install --save-dev @markusantonwolf/tailwind-css-plugin-multi-columns
# Install using yarn
yarn add -D @markusantonwolf/tailwind-css-plugin-multi-columns
```

### 2. Add it to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns')
    ]
}
```

### 3. Use it 😃 > 🥳 BOOM

## Usage

**The Tailwind CSS Multi Column plugin generates new utilities `.column` and `.rule` in the same way `.border` and `.gap` utilities are generated in Tailwind CSS.**

By Default the Multi Column Plugin uses your theme and colors so you don't have to redefine your settings - don't copy yourself. Configurated variants apply for columns and column rules - default variant is "responsive". To change rendered variants add the plugin information to the config or add it directly to the required plugin:

```js
// tailwind.config.js
module.exports = {
    // ...
    theme: {
        multiColumns: {
            span: {
                test: "inherit", // your multi column config
            },
        },
    },
    // ...
    variants: {
        multiColumns: ["responsive", "dark"]
    },
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns'),
    ]
}
```

```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns')({
            span: {
                test: "inherit", // your multi column config
            },
            variants: ["responsive", "dark"],
        }),
    ]
}
```

Learn more about how to configure Tailwind CSS: [More configurations](#user-content-more-configurations). You can find all available variants in the Tailwind CSS documentation: [Tailwind CSS - Configuring Variants](https://tailwindcss.com/docs/configuring-variants). 

## Examples

```html
<div class="column-2 column-gap-12 rule rule-dashed rule-gray-500">
    <!-- Content -->
</div>
```

```html
<div class="sm:column-2 xl:column-3 sm:column-gap-12 xl:column-gap-24 rule xl:rule-2 rule-dashed rule-gray-900 rule-opacity-50">
    <!-- Content -->
</div>
```

```html
<div class="md:column-2 xl:column-3 2xl:column-4 column-gap-12 xl:rule-2 rule-dotted rule-gray-300">
    <!-- Content -->
</div>
```

With this Tailwind CSS Plugin you can easily the following multi-column properties:

- column-count
- column-gap
- column-rule-style
- column-rule-width
- column-rule-color
- column-rule
- column-span
- column-width

**You can find a list of all generated utilities here - [All Multi Column utilities](https://github.com/markusantonwolf/tailwind-css-plugin-multi-columns/blob/master/dist/multi-columns.css)**

## More configurations

In the following example you can see all available options (default values) for the Multi Column plugin. The params `variants`, `styles` and `columns` are replacing the configuration and the other params will get merged with your Tailwind CSS theme.

```js
// tailwind.config.js
module.exports = {
    // ...
    theme: {
        multiColumns: {
            styles: ["dotted", "solid", "dashed"],
            columns: ["2", "3", "4", "5", "6", "7", "8", "9"],
            span: [], // merges definitions
            gaps: [], // merges definitions
            spacing: [], // merges definitions
            colors: [], // merges definitions
            borderWidth: [], // merges definitions
            opacity: [], // merges definitions
        },
    },
    // ...
    variants: {
        multiColumns: ["responsive", "dark"]
    },
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns'),
    ]
}
```

## Licence

Tailwind CSS Plugin Filter utilities is released under the [MIT license](https://github.com/markusantonwolf/tailwind-css-plugin-multi-columns/blob/master/licence.md) & supports modern environments.

## Copyright

© 2021 Markus A. Wolf
<https://www.markusantonwolf.com>
