<template>
    <div>
        <div :style="`background-image: url(${home.images[0]})`" class="app-house-header"></div>
        <div class="app-house-body">
            <img class="app-fav" src="/images/icons/heart.svg" alt="">
            <h2>{{ home.title }}</h2>
            <div class="app-address">
                {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} <br/>
            </div>
            <div class="app-amenities">
                <p>
                    {{ pluralize(home.guests, 'guest') }}, {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.beds, 'bed') }}, {{ pluralize(home.bathrooms, 'bathroom') }}
                </p>
                <p>
                    {{ features }}
                </p>
            </div>
            <div class="app-flex">
                <div class="app-rating">
                    {{ home.reviewValue }}
                    <span>
                        ({{ home.reviewCount }})
                    </span>
                </div>
                <div class="app-price">
                    ${{ home.pricePerNight }} <span> / night</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pluralize from '~/utils/pluralize'

export default {
    props: {
        home: {
            type: Object,
            required: true,
        }
    },
    computed: {
        features() {
            return this.home.features.slice(0, 3).join(', ')
        }
    },
    methods: {
        pluralize,
    }
}
</script>