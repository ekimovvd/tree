const {configure} = require("quasar/wrappers");

module.exports = configure(function (/* ctx */) {
    return {
        boot: [],

        css: ["app.scss"],

        extras: ["roboto-font", "material-icons"],

        build: {
            target: {
                browser: [
                    "es2019",
                    "edge88",
                    "firefox78",
                    "chrome87",
                    "safari13.1",
                ],
                node: "node20",
            },

            vueRouterMode: "hash",

            publicPath: "/tree/",
        },

        devServer: {
            open: true,
        },

        framework: {
            config: {},

            plugins: ["Dialog"],
        },

        animations: [],

        ssr: {
            pwa: false,

            prodPort: 3000,

            middlewares: ["render"],
        },

        pwa: {
            workboxMode: "generateSW",
            injectPwaMetaTags: true,
            swFilename: "sw.js",
            manifestFilename: "manifest.json",
            useCredentialsForManifestTag: false,
        },

        cordova: {},

        capacitor: {
            hideSplashscreen: true,
        },

        electron: {
            inspectPort: 5858,

            bundler: "packager",

            packager: {},

            builder: {
                appId: "tree-project",
            },
        },

        bex: {
            contentScripts: ["my-content-script"],
        },
    };
});
