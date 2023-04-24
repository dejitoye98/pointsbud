<template>
    <div class="loyalty">
        <div class="loyalty__container">
            <template>
                <div class="loyalty-setup">
                    <h2>Set up a loyalty program</h2>
                    <p>There can be only one active loyalty program at a time</p>
                </div>
            </template>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            programs: [],

        }
    }
}
</script>

<style lang="scss" scoped>
.loyalty {}

.loyalty-setup {
    width: 50%;
    margin: auto;
    border: 1px dashed lightgrey;

}
</style>