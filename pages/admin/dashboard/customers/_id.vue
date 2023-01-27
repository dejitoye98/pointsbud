<template>
  <div class="page">
    <div class="section flex">
      <!--
      <h2 class="section-title">Details</h2>-->
      <div class="details">
        <div class="details__item">
          <div class="details__item__header">Customer information</div>
          <div class="details__item__content">
            <div class="details__item__content__item">
              <p>Customer Name</p>
              <p>Deji Atoyebi</p>
            </div>
            <div class="details__item__content__item">
              <p>Email</p>
              <p>itisdeji@gmail.com</p>
            </div>
            <div class="details__item__content__item">
              <p>Phone</p>
              <p>08100455706</p>
            </div>
            <div class="details__item__content__item">
              <p>Code</p>
              <p>5043</p>
            </div>
            <div class="details__item__content__item">
              <p>Points Earned</p>
              <p>443</p>
            </div>
            <div class="details__item__content__item">
              <p>Purchases</p>
              <p>344</p>
            </div>
          </div>
        </div>
        <div class="virtualcard">
          <div class="virtualcard__front">
            <p class="virtualcard__code">535453453</p>
            <p class="virtualcard__name">Deji Atoyebi</p>
          </div>
        </div>
        <div class="details__item">
          <div class="details__item__header">Contact</div>
          <div class="form">
            <div class="form-input">
              <label>Subject</label>
              <input type="text" />
            </div>
            <div class="form-input">
              <label>Message</label>
              <textarea></textarea>
            </div>
            <div style="display: flex; justify-content: flex-end">
              <button>Send Email</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Orders</h2>

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
.form {
  padding: 16px;
  button {
    @include smallbutton;
    align-self: flex-end;
  }
}
.form-input {
  @include plain-form-input;
}

.details {
  width: 100%;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: space-between;
  &__item {
    @include card;
    border-radius: 10px;
    height: max-content;

    &__header {
      background: $dashboard-background-color;
      border-bottom: 2px solid whitesmoke;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 16px;
    }
    &__content {
      padding: 8px 0;
      &__item {
        display: flex;
        padding: 16px 16px;
        justify-content: space-between;
        border-bottom: 1px solid whitesmoke;
        &:last-of-type {
          border-bottom: 0;
        }
        p {
          color: $charcoal;
          font-size: 16px;

          &:first-of-type {
            color: black;
          }
        }
      }
    }
  }
}

.section {
  margin-bottom: 36px;
  &-title {
    color: $faint;
    font-size: 25px;
    margin-bottom: 8px;
  }
}
.flex {
  display: flex;
}
.virtualcard {
  height: 300px;
  border-radius: 10px;
  @include card;
  background: $lightaccent;
  padding: 16px;
  &__code {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 20px;
    text-align: center;
    width: 100%;
    span {
      font-size: 30px;
    }
  }
  &__name {
    color: white;
    font-size: 18px;
    text-align: center;
  }
}

.table {
  @include card;
  width: 100%;
  border-radius: 10px;
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
</style>
