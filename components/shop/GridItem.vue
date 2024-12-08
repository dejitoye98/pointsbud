<template>
    <div class="item">
        <div class="thumbnail">
            <img :src="product.thumbnail">
        </div>

        <div class="padding-8-y flex space-between">
            <p class="name">{{product.name}}</p>
            <p class="price">{{'NGN' | currencySymbol }}{{product.unitprice | money}}</p>
        </div>

        <div>
            <TruncatedText color="grey" limit="50" :text="product.description">
                
            </TruncatedText>
           
        </div>

        <div style="justify-content: flex-end; padding:6px 0px">
            <button style="width: 100%;font-size: 16px; background-color: white; color: black; border: 1px solid black; font-weight:500; border-radius: 20px; padding: 8px 16px">Select</button>
        </div>
    </div>
</template>


<script>
import TruncatedText from '../text/TruncatedText.vue';

export default {
    props: ['product'],
    data() {
        return {};
    },
    components: { TruncatedText }
}
</script>

<style>
.item {
    width: 100%;
    flex-direction: column;
    background-color: white;
}

.thumbnail {
    height: 150px;
    border-radius: 10px;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;

    }
}

.name {
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
}


.price {
    font-weight: 500;
}
</style>