const fs = require("fs");
const plugin = require("tailwindcss/plugin");
const _ = require("lodash");
const hexRgb = require("hex-rgb");
const { paramCase } = require("change-case");

const defaultOptions = {
    variants: ["responsive"],
    styles: ["dotted", "solid", "dashed"],
    columns: ["2", "3", "4", "5", "6", "7", "8", "9"],
    span: [],
    gaps: [],
    spacing: [],
    colors: [],
    borderWidth: [],
    opacity: [],
};

let utilities = {};

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addUtilities, theme }) {
        options = _.defaults({}, options, defaultOptions);
        options["gaps"] = theme("gap");
        options["spacing"] = theme("spacing");
        options["colors"] = theme("colors");
        options["borderWidth"] = theme("borderWidth");
        options["opacity"] = theme("opacity");
        addUtilities(getTaColumns(options), options.variants);
        addUtilities(getTaColumnColors(options));

        if (options.export === true) {
            fs.writeFileSync(
                "./dist/multi-columns.css",
                flattenObject(utilities),
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );
        }
    };
});

function getTaColumns(options) {
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

    new_utilities[".column-span-all"] = {
        columnSpan: "all",
    };

    for (const property in options.gaps) {
        new_utilities[".column-gap-" + property] = {
            columnGap: options.gaps[property],
        };
    }

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

    if (options.export === true) {
        utilities = _.merge(utilities, new_utilities);
    }

    return new_utilities;
}

function getStyleRule(inputColor) {
    try {
        const color = hexRgb(inputColor);
        return {
            "--ta-column-rule-color": `rgba(${color.red}, ${color.green}, ${color.blue}, var(--ta-column-rule-opacity))`,
        };
    } catch (error) {
        console.info(
            "Tailwind CSS Plugin Multi Column - not rendered color: ",
            inputColor
        );
    }
}

function getTaColumnColors(options) {
    const new_utilities = {};

    for (const property in options.colors) {
        if (_.isObject(options.colors[property])) {
            for (const item in options.colors[property]) {
                const styleRule = getStyleRule(options.colors[property][item]);
                if (styleRule) {
                    new_utilities[`.rule-${property}-${item}`] = styleRule;
                }
            }
        } else {
            const styleRule = getStyleRule(options.colors[property]);
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

    if (options.export === true) {
        utilities = _.merge(utilities, new_utilities);
    }

    return new_utilities;
}

function flattenObject(ob) {
    var toReturn = "";
    for (var a in ob) {
        toReturn += a + " ";
        if (typeof ob[a] == "object" && ob[a] !== null) {
            toReturn += "{" + "\n";
            for (var b in ob[a]) {
                if (b.substring(0, 2) === "--") {
                    toReturn += "\t" + b + ": " + ob[a][b] + ";\n";
                } else {
                    toReturn += "\t" + paramCase(b) + ": " + ob[a][b] + ";\n";
                }
            }
            toReturn += "}" + "\n";
        }
        toReturn += "\n";
    }
    return toReturn;
}
