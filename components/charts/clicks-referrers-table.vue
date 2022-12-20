<template>
    <div>
     <p class="header">Top Sources</p>
     <Listing
        :show_pagination="false"
        :labels="clicks.top_referrers.labels"
        :records="clicks.top_referrers.data"
        :clicks="clicks.volume"

    />
    </div>
</template>

<script>
export default {
    props: ['clicks']
}
</script>

<style lang="scss" scoped>
.header {
    color: #686868 !important;
    font-size: 14px !important;
    text-transform: none;
    font-weight: 400;
    display: block;
    width: 100%
}
</style>