<template>
    <div class="side__item" @click="setActive">
        <nuxt-link class="link"  :to="'/dashboard' + link">
            <div class="side__item__indi" :class="[active === text ? 'active': '']"></div>
            <div class="side__item__icon">                      
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 6V18" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z" stroke="grey" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="side__item__text"  :class="[active === text ? 'active': '']">
                <p>{{text}}</p>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: ['text', 'link'],
    computed: {
        ...mapGetters("dashboard", ["active"]),
    },
    methods: {
        setActive() {
            this.$store.commit('dashboard/setActive', this.text)
            this.$store.commit('dashboard/setDashboardTitle', this.text)
        }
    }
}
</script>

<style lang="scss" scoped>
.link {
    display: flex;
}
.active{ 
    opacity: 1 !important;
    color: $sidebar_text_active_color !important;
}
.side__item {
    position: relative;
    display: flex;
    padding: 8px 36px;
    cursor: pointer;
    align-items:center;
    margin-bottom: $sidebar_item_margin;
    
    div {
        height: 100%;
        p {
            display: block;
            height: 100%;
        }
    }


    &:hover {
        background: $sidebar_item_hover_color;

        
    }

    &__indi {
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 3px;
        background: $primary;
        left: 0;
        top: 0;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    &__icon {
        margin-right: 16px;
    }
    &__text {
        font-weight: 400;
        color: $sidebar_text_color;
        font-size: $sidebar_text_font_size;

        &:hover {
            color: black;
        }
    }

}
</style>