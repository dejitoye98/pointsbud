<template>
    
</template>

<script>
export default {
    created() {
        const referrer = document.referrer;
        this.$api.get('/links/' + this.$route.params.slug + '/redirect').then(resp=> {
            window.location.replace(`${resp.data.data.link}?ref=${this.$route.params.slug}&referrer=${referrer}`)
        })
    }
}
</script>