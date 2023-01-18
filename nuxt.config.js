export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "afillee",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                href: "https://fonts.googleapis.com/css?family=Quicksand:300,500|Playfair+Display:700i",
                rel: "stylesheet",
            },
        ],
        script: [
            {
                src: "https://checkout.flutterwave.com/v3.js",
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~assets/scss/colors.scss"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "~/plugins/api", ssr: true }, "@/plugins/money.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        {
            path: "~/components", // will get any components nested in let's say /components/test too
            pathPrefix: false,
            extensions: ["vue"],
        },
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
    ],

    styleResources: {
        scss: ["./assets/scss/*.scss"],
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/style-resources",
        ["cookie-universal-nuxt", { alias: "cookies" }],
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        // transpile: ['@vuepic/vue-datepicker']
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },
};
