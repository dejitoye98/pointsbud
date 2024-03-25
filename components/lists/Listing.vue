
<template>

    <div class="table">
        <div class="table__container">

            <div class="table__header">
                <slot  name="header">
    
                </slot>

            </div>
            
            
            
            <div class="table__content" :class="[truncate ? 'truncated' : '']">

                <slot name="data"></slot>


               



            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['pagination_data', 'truncate'],
    methods: {

        onPaginateClicked(page) {
            this.$emit('onPaginateClicked', page)
        }
        
    }
}

</script>


<style lang="scss" scoped>

.pagination-box {
    padding: 20px;
    border-top: 1px dashed lightgrey;
    margin-top: 50px;
}

.table {
    width: 100%;

    &__container {
        width: 100%;
    }

    &__content {
        width: 100%;
    }
}
table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-family: Poppins;
    //padding: 24px;
}


th, td {
    //border: 1px solid #ddd;
    //padding: 8px;
    font-size: 12px;
    text-wrap: nowrap;

}

td {
    padding: 2px 24px;
    font-weight: 400;
    font-size: 15px;


}

th {
    //background-color: #f2f2f2;
    color: black;
    color: #000;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
min-width: 100px !important;
height: 60px;
background-color: whitesmoke;

padding: 16px 24px;
color: #525f7f;
font-size: 16px;
//text-transform: uppercase;
//background-color: #f5f9fc;


}


tr {
    line-height: 40px !important;
    padding: 16px;
    width: 100%;
}
tr:nth-child(even) {
    //background-color: #f9f9f9;
}

tr:hover {
    //background-color: #e8e8e8;
}

.truncated {
    max-height: 34vh;
    overflow: scroll;
}
</style>