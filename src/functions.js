const _ = require("lodash");
const hexRgb = require("hex-rgb");
const { paramCase } = require("change-case");
const replaceString = require("replace-string");

function escape(string) {
    var name = String(string);
    return name.substr(0, 1) + replaceString(name.substr(1), ".", "\\.");
}

module.exports = {
    getStyleRule: (inputColor) => {
        if (["transparent", "currentColor"].includes(inputColor)) {
            return {
                "--ta-column-rule-color": inputColor,
            };
        }
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
    },
    flattenObject: (ob) => {
        var toReturn = "";
        for (var a in ob) {
            toReturn += escape(a) + " ";
            if (typeof ob[a] == "object" && ob[a] !== null) {
                toReturn += "{" + "\n";
                for (var b in ob[a]) {
                    var output = ob[a][b];
                    if (_.isObject(ob[a][b])) {
                        output = "\t{" + "\n";
                        for (var c in ob[a][b]) {
                            output += "\t\t" + c + ": " + ob[a][b][c] + ";\n";
                        }
                        output += "\t}" + "\n";
                    }
                    if (b.substring(0, 2) === "--") {
                        toReturn += "\t" + b + ": " + output + ";\n";
                    } else if (b.indexOf("%") !== -1) {
                        toReturn += "\t" + b + " " + output;
                    } else {
                        toReturn += "\t" + paramCase(b) + ": " + output + ";\n";
                    }
                }
                toReturn += "}" + "\n";
            }
            toReturn += "\n";
        }
        return toReturn;
    },
};
