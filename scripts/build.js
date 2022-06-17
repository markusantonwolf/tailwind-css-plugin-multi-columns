const fs = require("fs");
const postcss = require("postcss");
const tailwind = require("tailwindcss");
const CleanCSS = require("clean-css");

function buildDistFile() {
    return new Promise((resolve, reject) => {
        return postcss([
            tailwind({
                content: ["./public/**/*.{html,js}"],
                theme: {
                    container: {
                        center: true,
                    },
                    multiColumns: {
                        span: {
                            test: "inherit",
                        },
                    },
                },
                variants: {
                    multiColumns: ["responsive"],
                },
                plugins: [require("../src/index.js")],
            }),
            require("autoprefixer"),
        ])
            .process(
                `
@tailwind base;
@tailwind components;
@tailwind utilities;
      `,
                {
                    from: undefined,
                    to: `./dist/tailwind-multi-columns.css`,
                    map: { inline: false },
                }
            )
            .then((result) => {
                fs.writeFileSync(
                    `./dist/tailwind-multi-columns.css`,
                    result.css
                );
                fs.writeFileSync(
                    `./public/dist/tailwind-multi-columns.css`,
                    result.css
                );
                return result;
            })
            .then((result) => {
                const minified = new CleanCSS().minify(result.css);
                fs.writeFileSync(
                    `./dist/tailwind-multi-columns.min.css`,
                    minified.styles
                );
                fs.writeFileSync(
                    `./public/dist/tailwind-multi-columns.min.css`,
                    minified.styles
                );
            })
            .then(() => {
                const data = fs.readFileSync(`./dist/multi-columns.css`, {
                    encoding: "utf8",
                });
                const minified = new CleanCSS().minify(data);
                fs.writeFileSync(
                    `./dist/multi-columns.min.css`,
                    minified.styles
                );
                fs.writeFileSync(
                    `./public/dist/multi-columns.min.css`,
                    minified.styles
                );
            })
            .then(resolve)
            .catch((error) => {
                console.log(error);
                reject();
            });
    });
}

console.info("Compiling build...");

Promise.all([buildDistFile()]).then(() => {
    console.log("Finished.");
});
