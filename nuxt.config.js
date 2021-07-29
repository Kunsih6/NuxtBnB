export default {
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
    components: true,
    css: [
        '~/assets/sass/app.scss'
    ],
    privateRuntimeConfig: {
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_PRIVATE_API_KEY
        }
    },
    publicRuntimeConfig: {
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            key: process.env.ALGOLIA_API_KEY
        },
        auth: {
            cookieName: 'idToken',
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        },
        google: {
            maps: {
                key: process.env.GOOGLE_MAPS_KEY
            }
        },
    },
    head: {
        titleTemplate: 'Mastering Nuxt: %s',
        htmlAttrs: {
            lang: 'en'
        },
        bodyAttrs: {
            class: ['my-style']
        },
        meta: [{
            charset: 'utf-8',
        }]
    },
    modules: ['~/modules/auth', '~/modules/algolia'],
    plugins: ['~/plugins/auth.client', '~/plugins/dataApi', '~/plugins/maps.client'],
    router: {
        prefetchLinks: false,
    }
}