<template>
 <BaseModal>
    <template #body>
      <div class="body">
        <div class="body__header">
            <p>Create Reservation</p>
            <p>{{space.name}} - {{checkIn}} - {{checkOut}}</p>
            <p>Price: {{space.currency}} {{total}}</p>
        </div>
        <div class="form-input">
            <label>Customer Name</label>
            <input v-model="model.name" type="text"/>
        </div>
        <div class="form-input">
            <label>Email Address</label>
            <input v-model="model.email" type="email"/>
        </div>
        <div class="form-input">
            <label>Phone Number</label>
            <input v-model="model.phone"/>
        </div>
        <label><input type="checkbox" v-model="model.generate_receipt"/> Generate and send receipt </label>
      </div>
      <div class="footer">
        <div class="footer__container">
          <button @click="$emit('onCancel');">Cancel</button>
          <button @click="$emit('onExecute')">Continue</button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>


<script>
export default{
    props:['space', 'checkIn', 'checkOut', 'total'],
    data() {
        return {
            model: {
                email: '',
                phone: '',
                name: '',
                generate_receipt: true
            }
        }
    },
    computed: {
        
    }
}
</script>
<style lang="scss" scoped>
.form-input {
    @include plain-form-input;
}

label {
    color: $charcoal !important;

}
.body {
    padding: 16px;
    &__header  {
        padding: 16px 0;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 0.5px solid lightgrey;
        margin-bottom: 24px;
        p{
            color: $charcoal;
            font-size: 14px;
            &:first-of-type {
                font-size: 16px;
                font-weight: 700;
                color: black;
            }
        }
    }
}

.footer {
  &__container {
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    button {
      @include smallbutton;
      &:first-of-type {
        background: white;
        margin-right: 8px;
        color: rgb(27, 31, 35);
      }
    }
  }
}
</style>