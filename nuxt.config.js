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
    publicRuntimeConfig: {
        googleKey: process.env.GOOGLE_KEY,
        algoliaAppId: process.env.ALGOLIA_APP_ID,
        algoliaApiKey: process.env.ALGOLIA_API_KEY,
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
    plugins: ['~/plugins/dataApi', '~/plugins/maps.client'],
    router: {
        prefetchLinks: false,
    }
}