<template>
    <div class="card">
        <div class="card__header">
            <div class="card__header__text">
                <p>{{title}}</p>
            </div>
            <div class="filter card__filter">
                <select name="" id="">
                    <option>This week</option>
                    <option>This month</option>
                </select>
            </div>
        </div>

        <div class="card__body">
            
        </div>
    </div>

</template>

<script>
export default {
    props: ['title'],

}
</script>


<style lang="scss" scoped>

.card {
    height: auto;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-30 {
        width: 30% !important;
    }
    &--flex {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center !important;

        @include media("<=t") {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

    }

    
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        //border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
        button {
            @include smallbutton-white;
            width: auto;
            padding: 8px 16px;
            height: auto;
            min-height: auto;
        }

        p {
            color: black;
            font-size: 16px !important;
            text-transform: none;
            font-weight: 600;
        }

        
    }

    

}
</style>