<template>
    <div class="table">
        <div class="table">
            <div class="table__options">
                <div class="table__options__search">
                    <SearchInput></SearchInput>
                </div>
                <div class="table__options__filter">
                    <svg width="15" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.40002 2.09998H18.6C19.7 2.09998 20.6 2.99998 20.6 4.09998V6.29998C20.6 7.09998 20.1 8.09998 19.6 8.59998L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.49998C3.80002 7.99998 3.40002 7.09998 3.40002 6.49998V4.19998C3.40002 2.99998 4.30002 2.09998 5.40002 2.09998Z"
                            stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M10.93 2.09998L6 9.99998" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    Filter
                </div>
            </div>
            <table>
                <tr class="header-row">
                    <slot name="header"></slot>

                </tr>
                <slot name="data">

                </slot>
            </table>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.table {
    //@include card;
    width: 100%;
    border-radius: 5px;
    height: max-content; //margin-top: 16px;
    background: white;
    @include card;
    // border: 2px solid whitesmoke;

    &__options {
        padding: 16px;
        display: flex;
        align-items: center;
        font-size: 15px;
        justify-content: flex-end;
        border-bottom: 1px solid whitesmoke;


        &__search {
            margin-right: 16px;
            width: 500px
        }

        &__filter {
            border: 0.5px solid rgba(226, 232, 240);
            font-size: 15px;
            padding: 8px 16px;
            font-size: 15px;
            border-radius: 5px;
            font-weight: 500;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                background: $dashboard-background-color;
            }

            svg {
                margin-right: 8px;
            }
        }
    }


    table {
        width: 100%;


        tr {
            border-bottom: 1px solid whitesmoke;
            height: 50px;
            cursor: pointer;

            &:hover {
                background: $dashboard-background-color;
            }

            &:last-of-type {
                border-bottom: 0;

            }

        }

        .header-row {
            height: 40px;
            cursor: auto;

            &:hover {
                // background: white;
            }
        }

        th {
            //background: $dashboard-background-color;
            color: rgb(187, 186, 186);
            text-align: left;
            padding: 0 16px;
            font-weight: 500;
            font-size: 13px;

        }

        td {
            text-align: left;
            color: $charcoal;
            padding: 0 16px;
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>