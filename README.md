# Tailwind CSS Plugin for Multi Column Layout

The CSS multi-column layout allows easy definition of multiple columns of text - just like in newspapers. This Tailwind CSS plugin adds utilities for you to use all multi-column properties. It is compatible with Tailwind CSS 1.9X und ^2.X.

## Installation

1. Install the Tailwind CSS Multi Column plugin:

```bash
# Install using npm
npm install --save-dev tailwind-css-plugin-multi-columns

# Install using yarn
yarn add -D tailwind-css-plugin-multi-columns
```

2. Add it to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns')
    ]
}
```

3. Use it 😃 > 🥳

## Usage

**The Tailwind CSS Multi Column plugin generates new utilities `.column` and `.rule` in the same way the `.border` and `.gap` utilities in Tailwind CSS.**

By Default the plugin uses your theme and colors so you don't have to redefine your settings. Variants apply for columns and column rules - default variant is "responsive.". To change rendered variants add your configuration to the required plugin:

```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('@markusantonwolf/tailwind-css-plugin-multi-columns')({
            variants: ["responsive", "dark"],
        }),
    ]
}
```

You can find all variants in the Tailwind CSS documentation: [Tailwind CSS - Configuring Variants](https://tailwindcss.com/docs/configuring-variants). 

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

## Licence

Tailwind CSS Plugin Filter utilities is released under the [MIT license](https://github.com/markusantonwolf/tailwind-css-plugin-multi-columns/blob/master/licence.md) & supports modern environments.

## Copyright

© 2020 Markus A. Wolf
<https://www.markusantonwolf.com>
