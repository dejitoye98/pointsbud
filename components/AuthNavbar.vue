<template>
    <div class="navbar">
        <div class="header">
            <div class="header__container">
                <div class="logo">
                    <img src="../static/logo.svg" alt="">

                </div>

                
            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>

.header {
    //width: 80%;
    //margin: auto;
    padding: 16px 0;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

    &__container {
        @include container;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include media("<=tablet") {
            flex-direction: column;
            flex-wrap: wrap;            
        }
    }

    &__steps {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media("<=tablet") {
            flex-wrap: wrap;
            align-items: center;
            justify-content: left;
            
        }


        &__item {
            cursor: pointer;
            display: flex;
            align-items: center;
            @include media("<=tablet") {
                margin-bottom: 8px;
                margin-right: 8px;
            }
            div {
                margin-right: 8px;
                
            }
            p {
                color: lightgrey;
                display: inline-block;
                font-size: 16px;
                @include media("<tablet") {
                    font-size: 14px;
                }
            }
        }

        &__divider {
            height: 2px;
            margin: 0 16px;
            width: 10px;
            background: rgba(211, 211, 211, 0.331);
            @include media("<=tablet") {
                display: none;
            }
        }
    }
}
</style>