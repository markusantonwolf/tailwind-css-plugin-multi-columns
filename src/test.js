const fs = require("fs");
const path = require('path')
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("tailwindcss/defaultConfig");
const _ = require("lodash");

const fnc = require("./functions");
const utilities = require("./utilities");

const defaultConfig = {
    variants: ["responsive"],
    styles: ["dotted", "solid", "dashed"],
    columns: ["2", "3", "4", "5", "6", "7", "8", "9"],
    span: {
        all: "all",
        none: "none",
    },
    gaps: [],
    spacing: [],
    colors: [],
    borderWidth: [],
    opacity: [],
};

let new_utilities = {};

const resolvedTailwindConfig = resolveConfig(tailwindConfig).theme;
const config = _.defaults(
    {
        gaps: resolvedTailwindConfig.gap,
        spacing: resolvedTailwindConfig.spacing,
        colors: resolvedTailwindConfig.colors,
        borderWidth: resolvedTailwindConfig.borderWidth,
        opacity: resolvedTailwindConfig.opacity,
        width: resolvedTailwindConfig.spacing,
    },
    defaultConfig
);

_.merge(new_utilities, utilities.columns(config));
_.merge(new_utilities, utilities.colors(config));
_.merge(new_utilities, utilities.rules(config));
_.merge(new_utilities, utilities.span(config));
_.merge(new_utilities, utilities.width(config));

const dest_path = path.join(__dirname, '..', 'test', 'multi-columns.css');
if (fs.existsSync(dest_path)) {
    fs.writeFileSync(
        dest_path,
        fnc.flattenObject(new_utilities),
    );
} else {
    dest_folder = path.join(__dirname, '..', 'test');
    if (!fs.existsSync(dest_folder)) {
        fs.mkdirSync(dest_folder);
    }
    fs.writeFileSync(
        dest_path,
        fnc.flattenObject(new_utilities),
    );
}

