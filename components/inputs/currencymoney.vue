<template>
  <div class="input">
    <select>
      <option>NGN</option>
    </select>
    <input type="text" />
  </div>
</template>

<style lang='scss' scoped>
.input {
  position: relative;
  @include plain-form-input;

  display: flex !important;
  flex-direction: row;
  select {
    width: 20%;
    border-top-right-radius: 0;
    border-right: 0;
    border-bottom-right-radius: 0;
    background: $dashboard-background-color;
  }
  input {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>