const plugin = require("tailwindcss/plugin");
const _ = require("lodash");

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
        _.merge(new_utilities, utilities.rules(config));
        _.merge(new_utilities, utilities.width(config));
        _.merge(new_utilities, utilities.colors(config));
        _.merge(new_utilities, utilities.span(config));

        addUtilities(new_utilities, {
            variants: plugin.variants,
            respectPrefix: plugin.respectPrefix,
            respectImportant: plugin.respectImportant,
        });
    };
});
