<template>
    <div>
        <div class="container">
            <div
                class="space-container"
                v-for="(type, index) in Object.keys(groupedSpaces)"
                :key="index"
            >
                <p class="space-container__header">{{ type }}</p>

                <div class="spaces">
                    <div
                        class="space"
                        v-for="(space, s_index) in groupedSpaces[type]"
                        :key="s_index"
                    >
                        <div class="space__container">
                            <div class="space__image">
                                <img :src="space.image" />
                            </div>
                            <div class="space__details">
                                <p class="name">{{ space.name }}</p>
                                <p class="price">
                                    NGN {{ space.price | money }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
}

.space-container {
    &__header {
        color: darkgrey;
        font-size: 20px;
    }
}
.space {
    @include card;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 18px !important;

    &__header {
    }

    &__container {
        padding: 16px;
    }

    &__image {
        width: 100%;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__details {
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        p {
            font-size: 18px !important;
            font-weight: 400 !important;
        }
    }
}
.spaces {
    width: 100%;
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    justify-content: space-between;
}
</style>
<script>
import { mapGetters } from "vuex";

export default {
    layout: "dashboard",
    data() {
        return {};
    },
    computed: {
        ...mapGetters("reservations", ["spaces"]),
        groupedSpaces() {
            if (this.spaces) {
                const types = {};
                this.spaces.forEach((space) => {
                    if (!types[space.type]) {
                        types[space.type] = [space];
                    } else {
                        types[space.type].push(space);
                    }
                });

                return types;
            }
            return {};
        },
    },
};
</script>
