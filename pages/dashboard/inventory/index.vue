<template>
  <div class="container">
    <div class="header">
      <p>Your personal inventories</p>
      <button @click="$router.push('/dashboard/inventory/create')">Create new</button>
    </div>
    <div class="card" @click="goTo(iv)" v-for="(iv, i) in inventories" :key="i">
      <div class="card__header">{{iv.name}}</div>
      <a class="card__link">afflee.com/inventory/{{iv.slug}}</a>
      <div class="card__details">
        <p>Created {{daysAgo(iv.createdAt)}}</p>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.container {
    width: 50%;

    @include media("<=t") {
        width: 100%;
    }

}
.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    align-items: center; 
    p {
        font-size: 18px;
        color: $faint;
    }
    button {
        @include smallbutton;
        
    }
}
.card {
    background: white;
    @include card;
    padding: 16px;
    border-radius: 5px;
    margin-bottom: 8px;
    @include media("<=t") {
        width: 100%;
    }
    &__header {
        font-size: 18px;
        font-weight: 500;
    }
    &__link {
        color: $lightaccent;
        font-size: 14px;
        display: inline-block;
    }
    &__details {
        color: $charcoal;
        font-size: 14px;
    }
}
</style>
<script>
import moment from "moment"
export default {
    layout: 'dashboard',
    data() {
        return {
            inventories: []
        }
    },
    created() {
        this.getData();
    },
    methods: {
        goTo(iv) {
            this.$router.push('/dashboard/inventory/' + iv.slug);
        },
        daysAgo(time) {
            const diff = moment().diff(moment(time), 'days');
            if (diff === 0) {
                return "today"
            }
            else if (diff === 1) {
                return 'yesterday'
            }
            
            return d + " days ago"
        },
        getData() {
            this.$api.get('/inventory').then(resp=> {
                this.inventories = resp.data.data;
            })
        }
    }
}
</script>