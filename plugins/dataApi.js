import { unWrap, getErrorResponse } from "~/utils/fetchUtils" 

export default function (context, inject) {
    const { $config } = context
    const appId = $config.algolia.appId
    const apiKey = $config.algolia.key
    
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }

    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
    })

    async function getHome(homeId) {
        try {
            return await unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return await unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try {
            return await unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
        try {
            return await unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    hitsPerPage: 10,
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    attributesToHighlight: [],
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }
}