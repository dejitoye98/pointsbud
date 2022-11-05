<template>
    <div class="section">
        <div class="item">
            <div class="item__image">
                <div class="item__container">
                    <img src="../../static/text-element.png"/>
                    <p>Text</p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="item__image">
                <div class="item__container">
                    <img src="../../static/text-element.png"/>
                    <p>Text</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ["elementGroup"],
    components: {
        
    }
}
</script>
<style lang="scss" scoped>
.section {
    height: 100vh;
    width: 100%;
    border-right: 1px solid  rgba(211, 211, 211, 0.442);
    background: white;

}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 100%;
    margin: auto;
    padding: 8px 16px;
    cursor: pointer;

    //background: rgba(154,178,182,.0666666667);
    background: rgb(3, 3, 51);

    &__container {
        width: 40px;
        height: 40px;
        margin: auto;
    }

    &__image {
        width: 100%;
        height: 100%;
    }
    p {
        //color: #737373;
        color: white;
        font-size: 15px;
    }
}
</style>