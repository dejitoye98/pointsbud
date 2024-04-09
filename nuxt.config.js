export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    publicRuntimeConfig: {
        API_BASE: process.env.API_BASE,
        SOCKET_BASE: process.env.SOCKET_BASE,
    },


    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Straight Green Card",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "Invest Beyond Boundaries: Your Share in Real Estate Prosperity with 6-13% Historical Returns" },
            { hid: "og:image", name: "og:image", content: "/assetblend_icon.png" },
            { name: "format-detection", content: "telephone=no" },
            //{ name: "google-signin-client_id", content: "638411293504-minstvm8qj8vmftvuaacnea143ghnpj7.apps.googleusercontent.com" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/assetblend_icon.png" },
            {
                href: "https://fonts.googleapis.com/css?family=Quicksand:300,500|Playfair+Display:700i",
                rel: "stylesheet",
            },
            { href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=Squada+One&display=swap&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,400;1,500', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500&display=swap', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap', rel: 'stylesheet' }
        ],
        script: [
            {
                src: "https://checkout.flutterwave.com/v3.js",
            },
            {
                src: 'https://accounts.google.com/gsi/client',
            },
            {
                src: 'https://js.paystack.co/v1/inline.js',
            },
            {
                src: 'https://unpkg.com/vue2-editor/dist/vue2-editor.umd.min.js"',
            },
            {
                src: "https://checkout.payaza.africa/js/v1/bundle.js",
                defer: true
            },


        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["~assets/scss/colors.scss", "~styles/css/main.css"],


    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: "~/plugins/api", ssr: true }, "@/plugins/money.js", "@/plugins/input.js"],

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
        '@nuxtjs/toast',
        "@nuxtjs/axios",
        "@nuxtjs/style-resources",
        ["cookie-universal-nuxt", { alias: "cookies" }],
    ],
    toast: {
        position: 'top-center',
        register: [ // Register custom toasts
            {
                name: 'my-error',
                message: 'Oops...Something went wrong',
                options: {
                    type: 'error'
                }
            }
        ]
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },


};
