<template>
  <div class="page">
    <BaseModal v-if="create_product" @close="create_product=false">
      <template #header>Create new product</template>
      <template #body>
        <div class="form" @click.stop>
          <div class="form-input">
            <label for>Name</label>
            <input type="text" name />
          </div>
          <div class>
            <label for>Price</label>
            <Currencymoney />
          </div>

          <div class="form-input">
            <label for>Category</label>
            <select>
              <option>Stuff</option>
              <option>Stuff</option>
              <option>Stuff</option>
            </select>
          </div>
          <div class="form-input">
            <label for>Points to earn</label>
            <input type="text" name />
          </div>
          <div class="form-input">
            <label for>Points to deduct</label>
            <input type="text" name />
          </div>
        </div>
      </template>
      <template #footer>
        <button>Create</button>
      </template>
    </BaseModal>

    <div class="section-title">
      <p>Products</p>
      <button @click="create_product = true">Create Product</button>
    </div>
    <div class="section">
      <div class="filter">
        <div class="filter__header">Filter</div>
        <div class="filter__container">
          <div class="filter__item">
            <label for>Product Name</label>
            <input type="text" placeholder="Name" />
          </div>

          <div class="filter__item">
            <label for>Category</label>
            <select>
              <option>Deji Atoyebi</option>
              <option>Deji Atoyebi</option>
              <option>Deji Atoyebi</option>
            </select>
          </div>
          <div class="filter__item">
            <label for>Deductible Points</label>
            <input type="text" placeholder="Name" />
          </div>
          <div class="filter__item">
            <label for>Addable Points</label>
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; padding: 0 16px 16px 16px">
          <button>Filter</button>
        </div>
      </div>

      <div class="table">
        <table>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Categories</th>
            <th>Price</th>
            <th>Deductible Points</th>
            <th>Addable Points</th>
          </tr>

          <tr>
            <td>
              <Avatar name="Deji Atoyebi"></Avatar>
            </td>
            <td>Skinkilla Soup</td>
            <td>itisdeji@gmail.com</td>
            <td>NGN 10,000</td>
            <td>50</td>
            <td>50</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin-dashboard",
  data() {
    return {
      create_product: false
    };
  },
  methods() {}
};
</script>

<style lang="scss" scoped>
.page {
  padding: 36px;
}

.filter {
  margin-bottom: 16px;
  //background: whitesmoke;
  background: whitesmoke;
  @include card;
  //box-shadow: none;
  height: max-content;
  button {
    @include smallbutton;
    // min-height: 50px;
    //min-width: 150px;
    font-size: 16px;
    background: $lightaccent;
  }
  &__header {
    height: 50px;
    padding: 16px;
    font-size: 16px;
    background: $dashboard-background-color;
    border-bottom: 1px solid whitesmoke;

    p {
      font-size: 18px;
      color: $charcoal;
    }
  }
  &__container {
    padding: 24px;
    //display: grid;
    //grid-template-columns: 24% 24% 24% 24%;
    justify-content: space-between;
  }
  &__item {
    @include plain-form-input;
  }
}

.section {
  display: grid;
  grid-template-columns: 25% 74%;
  justify-content: space-between;
}
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 40px;
  p {
    font-size: 18px;
    margin-right: 16px;
    color: $charcoal;
  }
  button {
    @include smallbutton;
    background: $lightaccent;
  }
}
.table {
  @include card;
  width: 100%;
  border-radius: 10px;
  height: max-content; //margin-top: 16px;
  table {
    width: 100%;
    tr {
      border-bottom: 1px solid whitesmoke;
      height: 65px;
      cursor: pointer;
      &:hover {
        background: $dashboard-background-color;
      }
    }
    th {
      background: $dashboard-background-color;
      color: $charcoal;
      text-align: left;
      padding: 0 16px;
      font-weight: 500;
    }
    td {
      text-align: left;
      color: $charcoal;
      padding: 0 16px;
    }
  }
}

.form {
  padding: 16px;
  width: 400px;
}
.form-input {
  @include plain-form-input;
  &--noborder {
    border: 0 !important;
    input {
      border: 0 !important;
    }
  }
}
</style>
