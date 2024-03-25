
<template>
    <DashboardLayout>
        <template #content>

            <div class="content">
                <div class="categories">
                    <div class="category" @click="selectCategory(category.slug)" :class="[category.selected ? 'category-selected' : '']" v-for="(category, index) in categories" :key="index">
                        {{ category.name }}
                    </div>
                </div>
                <div class="properties">
                    <div class="property-list">


                        <div class="property" v-for="(property, index) in properties" :key="index">
    
                            <PropertyItem :property="property" ></PropertyItem>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
        </template>
    </DashboardLayout>
</template>


<script>
import {mapGetters} from 'vuex';

export default {
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Properties' )
        this.$store.commit('dashboard/setActiveTab', 'Properties' )

        this.$store.dispatch('dashboard/fetchProperties')

       // this.$api.get('/media/signed-url')
    
    },
    data() {
        return {
            categories: [{
                name: "New", 
                slug: 'new',
                selected: true
            }, {
                name: "Top",
                slug: "top"
            }]
        }
    },
    methods: {
        selectCategory(slug) {
            for (let category of this.categories) {
                if (category.slug === slug && !category.selected) {
                    category.selected = true;
                    this.getCategoryProperties()
                }
                else if (category.slug === slug && category.selected) {

                }
                else{
                    category.selected = false
                }
            }
        },

        getCategoryProperties() {
            const selected_category = this.categories.find(a=> a.selected)
            this.$store.dispatch('dashboard/fetchProperties', {tag: selected_category.slug})

           
        }
    },


    computed: {
        ...mapGetters('dashboard', ['properties'])
    }
}

</script>

<style lang="scss" scoped>

.property {
    margin-bottom: 20px;
}

.category{
    
}

.categories{ 
    display: flex;
    margin: 20px 0;
    gap: 16px;
    

    .category {
        display: flex;
        padding: 16px;
        border: 1px solid #E0E0E0;
        background: #FFFCF8;
        border-radius: 50px;
        min-width: 100px;
        text-align: center;
        justify-content: center;
        cursor: pointer;
    }
}

.category-selected {
    border: 1px solid #FF6D17 !important;
}
.property-list {
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    gap: 16px;
    
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>