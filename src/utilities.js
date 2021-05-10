const _ = require("lodash");
const fnc = require("./functions");

module.exports = {
    columns: (options) => {
        const new_utilities = {};
        new_utilities[".column"] = {
            columnGap: "2rem",
            columnFill: "balance",
            columns: "auto 1",
        };

        for (const property in options.columns) {
            new_utilities[".column-" + options.columns[property]] = {
                columnGap: "2rem",
                columnFill: "balance",
                columns: "auto " + options.columns[property],
            };
        }

        for (const property in options.gaps) {
            new_utilities[".column-gap-" + property] = {
                columnGap: options.gaps[property],
            };
        }

        return new_utilities;
    },
    rules: (options) => {
        const new_utilities = {};
        new_utilities[".rule"] = {
            "--ta-column-rule-style": "solid",
            "--ta-column-rule-color": "black",
            "--ta-column-rule-opacity": "1",
            "--ta-column-rule-width": "1px",
            columnRule:
                "var(--ta-column-rule-width) var(--ta-column-rule-style) var(--ta-column-rule-color)",
        };

        for (const property in options.borderWidth) {
            if (property === "DEFAULT") {
                continue;
            }
            new_utilities[".rule-" + property] = {
                "--ta-column-rule-style": "solid",
                "--ta-column-rule-color": "black",
                "--ta-column-rule-opacity": "1",
                "--ta-column-rule-width": options.borderWidth[property],
                columnRule:
                    "var(--ta-column-rule-width) var(--ta-column-rule-style) var(--ta-column-rule-color)",
            };
        }

        for (const property in options.styles) {
            new_utilities[".rule-" + options.styles[property]] = {
                "--ta-column-rule-style": options.styles[property],
            };
        }

        return new_utilities;
    },
    colors: (options) => {
        const new_utilities = {};

        for (const property in options.colors) {
            if (_.isObject(options.colors[property])) {
                for (const item in options.colors[property]) {
                    const styleRule = fnc.getStyleRule(
                        options.colors[property][item]
                    );
                    if (styleRule) {
                        new_utilities[`.rule-${property}-${item}`] = styleRule;
                    }
                }
            } else {
                const styleRule = fnc.getStyleRule(options.colors[property]);
                if (styleRule) {
                    new_utilities[".rule-" + property] = styleRule;
                }
            }
        }

        for (const property in options.opacity) {
            new_utilities[".rule-opacity-" + property] = {
                "--ta-column-rule-opacity": options.opacity[property],
            };
        }

        return new_utilities;
    },
    span: (options) => {
        const new_utilities = {};
        for (const property in options.span) {
            new_utilities[".span-" + property] = {
                columnSpan: options.span[property],
            };
        }

        new_utilities[".column-span-all"] = {
            columnSpan: "all",
        };

        return new_utilities;
    },
    width: (options) => {
        const new_utilities = {};
        for (const property in options.width) {
            new_utilities[".column-width-" + property] = {
                columnWidth: options.width[property],
            };
        }

        return new_utilities;
    },
};
