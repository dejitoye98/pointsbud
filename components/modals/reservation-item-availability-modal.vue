<template>
  <BaseModal>
    <template #body>
      <div class="body">
        <p class="body__text" v-if="text">{{text}}</p>
        <p class="body__text" v-else>Are you sure you want to carry out this action?</p>
        <p class="body__implication" v-if="implication">{{implication}}</p>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  props: ["text", "implication"]
};
</script>

<style lang="scss" scoped>
.body {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20vh;
  padding: 16px;
  &__text {
    text-align: center;
    font-size: 15px;
  }
  &__implication {
    font-size: 14px;
    text-align: center;
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