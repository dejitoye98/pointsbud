<template>
  <div class="page">
    <div class="insights">
      <div class="insights__container">
        <div class="card">
          <div class="card__header">
            <div></div>Total Customers
          </div>
          <p>200</p>
        </div>
        <div class="card">
          <div class="card__header">
            <div></div>Returned this Month
          </div>
          <p>400</p>
        </div>
      </div>
    </div>

    <div class="table">
      <table>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Code</th>
          <th>Points Earned</th>
          <th>Purchases</th>
        </tr>

        <tr>
          <td>
            <Avatar name="Deji Atoyebi"></Avatar>
          </td>
          <td>Deji Atoyebi</td>
          <td>itisdeji@gmail.com</td>
          <td>08100455706</td>
          <td>#wrwerwer</td>
          <td>40</td>
          <td>50</td>
        </tr>
        <tr>
          <td>
            <Avatar name="James Atoyebi"></Avatar>
          </td>
          <td>James</td>
          <td>james@gmail.com</td>
          <td>08100455706</td>
          <td>#4233</td>
          <td>50</td>
          <td>30</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin-dashboard",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 36px;
}
.insights {
  width: 100%;
  &__container {
    width: 100%;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
  }
}
.card {
  @include card;
  padding: 16px;
  border-radius: 10px;
  &__header {
    display: flex;
    align-items: center;
    font-size: 18px;
    div {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: $charcoal;
      margin-right: 16px;
    }
  }
  p {
    margin-left: 31px;
    font-size: 40px;
  }
}

.table {
  @include card;
  margin-top: 10vh;
  width: 100%;
  border-radius: 10px;
  table {
    font-size: 15px;
    width: 100%;
    tr {
      border-bottom: 1px solid whitesmoke;
      height: 45px;
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
</style>
