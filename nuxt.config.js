export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    publicRuntimeConfig: {
        API_BASE: process.env.API_BASE,
        SOCKET_BASE: process.env.SOCKET_BASE,
        FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
        PAYMENT_GATEWAY: process.env.PAYMENT_GATEWAY,
        PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
        DINE_ORDER_SERVICE_URL: process.env.DINE_ORDER_SERVICE_URL
    },


    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "PointsBud",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "Buying and selling made easier" },
            { name: "format-detection", content: "telephone=no" },
            //{ name: "google-signin-client_id", content: "638411293504-minstvm8qj8vmftvuaacnea143ghnpj7.apps.googleusercontent.com" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "" },
            {
                href: "https://fonts.googleapis.com/css?family=Quicksand:300,500|Playfair+Display:700i",
                rel: "stylesheet",
            },
            {
                href: "https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&display=swap",
                rel: "stylesheet",
            },
           
            {
                href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
                rel: "stylesheet",
            },
            {
                href: "https://fonts.googleapis.com/css2?family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap",
                rel: "stylesheet",
            },
           
            {
                href: "https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap",
                rel: "stylesheet",
            },
            {
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap",
                rel: "stylesheet",
            },
            {
                href: "https://unpkg.com/vue-tel-input/dist/vue-tel-input.css",
                rel: "stylesheet",
            },
            { href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=Squada+One&display=swap&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,400;1,500', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500&display=swap', rel: 'stylesheet' },
            { href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap', rel: 'stylesheet' }
        ],
        script: [
            {
                src: "https://unpkg.com/vue-tel-input",
            },
            {
                src: "https://checkout.flutterwave.com/v3.js",
            },
            {
                src: 'https://accounts.google.com/gsi/client',
            },
            {
                src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c&libraries=places"
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
    plugins: [{ 
        src: "~/plugins/api", ssr: true }, 
        "@/plugins/getMenuImage.js",
        "@/plugins/money.js",
        "@/plugins/input.js",
        "@/plugins/currency.js",
        "@/plugins/vue-tel-input"
        

    ],
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
