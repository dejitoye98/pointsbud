<template>
  <div class="modal">
    <div class="modal__mask" @click="close">
      <div class="modal__container" style="width:">
        <div class="modal__body" @click.stop>
          <div class="modal__header" v-if="show_header || typeof (show_header) == 'undefined'">
            <slot name="header"></slot>
            <slot name="header-caption"></slot>
          </div>
          <slot name="body"></slot>
          <div class="modal__footer" v-if="show_footer || typeof (show_footer) == 'undefined'" @click.stop>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show_header", "show_footer"],
  methods: {
    close() {
      this.$emit("close", true);
    }
  }
};
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

  &__header {
    padding: 24px;
    font-size: 18px;
    border-bottom: 2px solid whitesmoke;
    // text-transform: uppercase;
    font-weight: 500;
  }

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
    width: max-content;
    margin: auto;
    height: max-content;
    border-radius: 10px;

    @include media("<=t") {
      width: 90%;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 24px 24px 16px;

    button {
      @include smallbutton;
      background: $lightaccent;
    }
  }
}
</style>