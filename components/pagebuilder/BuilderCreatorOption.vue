<template>
    <div class="item">
        <div class="item__image">
            <img v-if="name == 'Form'" src="../../static/form.png" alt="">
            <img v-else-if="name == 'Landing Page'" src="../../static/landing-page-2.png" alt="">
            <img v-else-if="name == 'Sales Page'" src="../../static/sales-page.png" alt="">
        </div>
        <p class="item__caption">
            {{name}}
        </p>
    </div>
</template>

<script>
export default {
    props: [
        'name',
        'image'
    ]
}
</script>



<style lang="scss" scoped>
.item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    width:100px;
    height: auto;
    cursor: pointer;
    padding: 4px ;
    &:hover {
        background: rgba(154,178,182,.0666666667);
    }
    &__caption {
        font-size: 14px; 
        color: #737373;
    }
    &__image {
        width: 20px;
        height: 20px;
        margin-bottom: 8px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>