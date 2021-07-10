console.log(process.env)
export default {
    components: true,
    publicRuntimeConfig: {
        googleKey: process.env.GOOGLE_KEY
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
    plugins: ['~/plugins/maps.client'],
    router: {
        prefetchLinks: false,
    }
}