<template>
  <div class="modal">
    <!-- Dark Overlay -->
    <div class="modal__mask" @click="close">
      <!-- Modal Container -->
      <div class="modal__container" :style="{...style}">
        <!-- Modal Body -->
        <div 
          class="modal__body" 
          @click.stop 
          :style="{
            background: background ? background : '', 
            width: containerWidth ? containerWidth : ''
          }"
        >
          <!-- HEADER -->
          <div class="modal__header" v-if="show_header || typeof show_header === 'undefined'">
            <slot name="header"></slot>
            <slot name="header-caption"></slot>
          </div>
          
          <!-- CONTENT -->
          <slot name="body"></slot>
          
          <!-- FOOTER -->
          <div 
            class="modal__footer" 
            v-if="show_footer || typeof show_footer === 'undefined'"
            @click.stop 
            :style="{ background: background ? background : '' }"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show_header", "show_footer", "style", "closable", "background", "containerWidth"],
  methods: {
    close() {
      if (typeof this.closable === 'boolean' && this.closable === false) {
        return;
      } else {
        this.$emit("close", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 
  Optional: Import a modern font.
  Or simply use the system stack to avoid extra HTTP requests:
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
*/
/*
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");
*/

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
  z-index: 100;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  &__mask {
    width: 100%;
    height: 100%;
    padding: 8px 0;
    position: fixed;
    overflow: auto;

    /* Fade-in effect for the dark overlay */
    background: rgba(0, 0, 0, 0);
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    padding-bottom: 200px;
  }

  &__container {
    /* Scale-up animation for the modal container */
    animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    margin: auto;
    margin-top: 10vh;
    position: relative;
    z-index: 5;
    overflow: auto;

    /* 
      Add a soft box-shadow to give the container some depth. 
      Adjust the spread/blur to your preference.
    */
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);

    /* Rounded corners */
    border-radius: 10px !important;
    max-width: 600px; /* You can adjust or remove if you prefer a fluid width */
  }

  &__body {
    background: #fff;
    margin: auto;
    border-radius: 5px;
    max-width: 100%; /* ensures it doesn’t exceed the container’s max-width */

    /* 
      Extra spacing. 
      You can unify padding for header/body/footer to keep consistent spacing.
    */
    padding: 16px 24px;

    /* 
      Keep the text legible.
      Switch to a modern fallback or your brand's font.
    */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    /* If you want to limit the height, you can set a max-height and let it scroll:
       max-height: 80vh; overflow-y: auto; 
    */
  }

  &__header {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 16px;
    
    /* Subtle bottom border for separation */
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;

    /* In case you want a distinct background or color:
       background-color: #f9f9f9;
       color: #333;
    */
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    /* Subtle top border to separate from body */
    border-top: 1px solid #eee;
    padding: 16px 24px;

    /* Keep the same font style for overall consistency */
    font-family: inherit;
    background: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    button {
      /* Example of a minimal button style; you can refine or remove your mixin */
      background: #e53945;
      color: #fff;
      border-radius: 4px;
      padding: 10px 16px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      margin-left: 8px;

      &:hover {
        background: darken(#e53945, 5%);
      }

      &:disabled {
        background-color: #ccc !important;
        cursor: not-allowed;
      }
    }
  }
}
</style>
