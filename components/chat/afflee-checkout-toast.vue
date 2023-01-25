<template>
  <div class="trust">
    <div class="trust__container">
      <div class="trust__toast">
        <div class="trust__toast__button">
          <img src="../../static/afflee-nobg.png" />
          <p>Is this safe?</p>
        </div>
        <!--<div class="trust__toast__secured">
          <p>Secured by Afflee</p>
        </div>-->
      </div>
      <div class="trust__cancel">
        <div>
          <svg
            @click.stop="$emit('close')"
            width="16"
            height="16"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L7 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round" />
            <path d="M7 1L1 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    close() {}
  }
};
</script>

<style lang="scss" scoped>
.trust {
  @include card;
  position: fixed;
  //background: #f1f5f8;
  background: white;
  width: 100%;
  right: 0;
  bottom: 0;
  z-index: 10;

  &__container {
    padding: 16px;
  }

  &__cancel {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }

  &__toast {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__secured {
      color: $charcoal;
      font-weight: 300;
    }

    &__button {
      display: flex;
      align-items: center;
      border: 2px solid white;
      padding: 8px;
      color: $primary;
      border-radius: 5px;
      background: #f1f5f8;
      cursor: pointer;
      &:hover {
        background: $primary;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      }
      img {
        width: 35px;
        height: 35px;
      }
    }
  }
}
</style>