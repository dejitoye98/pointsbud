<template>
  <div class="modal">
    <div class="modal__mask" @click="close">
      <div class="modal__container" style="width:">
        <div class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal__body">
          <slot name="body">
            <div class="modal__footer">
              <slot name="footer"></slot>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes scaleUp {
  0% {
    transform: scale(0.8) translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
}

.modal {
  z-index: 10000000000000;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: scale(1);
  &__mask {
    width: 100%;
    height: 100%;
    padding: 64px 0;
    position: fixed;
    overflow: scroll;

    //animation
    background: rgba(0, 0, 0, 0);
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    @include media("<=dashbreak") {
      margin-left: 0 !important;
    }
  }
  &__container {
    //animation
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    @include media("<=dashbreak") {
      margin-left: 0 !important;
    }
  }
  &__body {
    background: white;
    width: 500px;
    margin: auto;

    @include media("<=t") {
      width: 90%;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    border: 1px solid pink;
  }
}
</style>