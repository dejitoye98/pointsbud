<template>
  <div class="input">
    <div class="input__container" :v-html="category" @click="show_dropdown = !show_dropdown">{{ category }}</div>
    <div class="dropdown" v-if="show_dropdown == true">
      <div class="dropdown__item dropdown__item--new">
        <input type="text" v-model="new_category" />
        <button @click="createCategories">Create Category</button>
      </div>
      <div class="dropdown__item" v-for="(category, index) in categories" :key="index" @click="chooseCategory(category)">
        {{ category.name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getCategories();
  },
  data() {
    return {
      new_category: "",
      show_dropdown: false,
      category: "",
      creating_category: false,
      categories: null
    };
  },
  methods: {
    createCategories() {
      this.creating_category = true;
      this.$api
        .post("/categories", {
          category: this.new_category
        })
        .then(resp => {
          this.categories.unshift(resp.data.data)
          this.chooseCategory(resp.data.data)
        }).catch(err => {
          alert(err?.response?.data?.data)
        })
        .finally(() => {
          this.creating_category = false;
        });
    },
    chooseCategory(category) {
      this.category = category.name;
      this.show_dropdown = false;
      this.$emit("onChoose", category.id);
    },
    getCategories() {
      this.$api.get("/categories").then(resp => {
        this.categories = resp.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.input {
  z-index: 200000000000000000000000000;
  background: white;
  width: 101%;
  min-height: 45px;
  border: 1px solid whitesmoke;
  border: 1px solid rgba(211, 211, 211, 0.774);
  border-radius: 5px;
  margin-bottom: 16px;

  position: relative;

  &__container {
    // border: 5px solid green;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 16px;
    font-size: 15px;
    color: $charcoal;
  }
}

.dropdown {
  width: 100%;
  position: absolute;
  z-index: 2000000000000000000000000000;

  height: 100%;
  background: white;
  border: 0.5px solid whitesmoke;
  left: -2px;

  &:hover {
    background: $dashboard-background-color;
  }

  &__item {
    background: white;
    padding: 8px 16px;
    width: 100%;
    border: 2px solid whitesmoke;
    border-top: 0;
    font-size: 14px;
    cursor: pointer;
    color: $lightaccent;

    &--new {
      //background: $lightaccent;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;

      input {
        height: 100%;
        border: 2px solid whitesmoke;
        width: 100%;
        margin-right: 16px;
        margin-left: 16px;
        padding: 8px;
        font-size: 15px;

        color: $charcoal;

        &:focus {
          outline: 0;
        }
      }

      button {
        @include smallbutton;
        background: $lightaccent;
        font-size: 13px;
        margin-right: 16px;
      }
    }
  }
}
</style>