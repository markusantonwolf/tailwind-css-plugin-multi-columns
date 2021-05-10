const fs = require("fs");
const plugin = require("tailwindcss/plugin");
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

const pluginDefaults = {
    variants: ["responsive"],
    respectPrefix: false,
    respectImportant: true,
};

let new_utilities = {};

if (process.env.NODE_ENV === "test") {
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

    fs.writeFile(
        "./test/multi-columns.css",
        fnc.flattenObject(new_utilities),
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    );
}

if (process.env.NODE_ENV === "production") {
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

    fs.writeFile(
        "./dist/multi-columns.css",
        fnc.flattenObject(new_utilities),
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    );
}

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addUtilities, theme, variants, options }) {
        const new_utilities = {};
        var config = _.defaults({}, options, defaultConfig);
        config["gaps"] = theme("gap");
        config["spacing"] = theme("spacing");
        config["colors"] = theme("colors");
        config["borderWidth"] = theme("borderWidth");
        config["opacity"] = theme("opacity");
        config["width"] = theme("spacing");

        config = _.defaultsDeep(config, theme("multiColumns"));

        const plugin = _.defaultsDeep(
            config,
            { variants: variants("multiColumns") },
            pluginDefaults
        );

        _.merge(new_utilities, utilities.columns(config));
        _.merge(new_utilities, utilities.colors(config));
        _.merge(new_utilities, utilities.rules(config));
        _.merge(new_utilities, utilities.span(config));
        _.merge(new_utilities, utilities.width(config));

        addUtilities(new_utilities, {
            variants: plugin.variants,
            respectPrefix: plugin.respectPrefix,
            respectImportant: plugin.respectImportant,
        });

        if (config.export === true) {
            fs.writeFileSync(
                "./dist/multi-columns.css",
                fnc.flattenObject(new_utilities),
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );
        }
    };
});
