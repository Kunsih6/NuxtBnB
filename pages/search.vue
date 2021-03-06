<template>
    <div class="app-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <NuxtLink v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
                    <HomeRow 
                        :home="home" 
                        class="app-house"
                        @mouseover.native="highlightMarker(home.objectID, true)" 
                        @mouseout.native="highlightMarker(home.objectID, false)" />
                </NuxtLink>
            </div>
            <div class="app-search-results-map">
                <div ref="map" class="app-map"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: `Homes around ${this.label}`
        }
    },
    async asyncData({ $dataApi, query }) {
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)

        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        this.updateMap()
        next()
    },
    mounted() {
        this.updateMap()
    },
    methods: {
        highlightMarker(homeId, isHightlighted) {
            document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHightlighted)
        },
        updateMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
        },
        getHomeMarkers() {
            if (this.homes.length === 0) return null

            return this.homes.map((home) => {
                return {
                    ...home._geoloc,
                    pricePerNight: home.pricePerNight,
                    id: home.objectID,
                }
            })
        }
    }
}
</script>

<style>
.marker {
    background-color: white;
    border: 1px solid lightgray;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
}

.marker-highlight {
    color: white !important;
    background-color: black;
    border-color: black;
}
</style>