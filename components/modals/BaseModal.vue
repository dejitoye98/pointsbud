<template>
    <div class="modal">
      <div class="modal__mask" @click="close">
        <div class="modal__container"  :style="{...style}">
          <div class="modal__body" @click.stop :style="{'background': background? background: '',  'width': containerWidth? containerWidth: '' }">
            <div class="modal__header" v-if="show_header || typeof (show_header) == 'undefined'">
              <slot name="header"></slot>
              <slot name="header-caption"></slot>
            </div>
            <slot name="body"></slot>
            <div class="modal__footer" v-if="show_footer || typeof (show_footer) == 'undefined'" @click.stop :style="{'background': background? background: ''}">
              <slot name="footer" :style="{'background': background? background: ''}"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["show_header", "show_footer", "style", "closable", 'background', 'containerWidth'],
    methods: {
      close() {
        if (typeof (this.closable) === 'boolean' && this.closable === false) {
          return
        }
        else {
  
          this.$emit("close", true);
        }
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
    z-index: 100;
    //height: 100vh;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transform: scale(1);
  
    &__header {
      //padding: 16px;
      font-size: 16px;
     // border-bottom: 1px solid whitesmoke;
      // text-transform: uppercase;
      font-weight: 500;
      font-family: Poppins !important;
      font-family: Poppins !important;
      font-weight: 600 !important;
      font-size: 18px !important;
    }
  
    &__mask {
      width: 100%;
      height: 100%;
      padding: 8px 0;
      position: fixed;
      overflow: scroll;
  
      //animation
      background: rgba(0, 0, 0, 0);
      animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  
      padding-bottom: 200px;
  
  
      @include media("<=dashbreak") {
        margin-left: 0 !important;
      }
    }
  
    &__container {
      //animation
      animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
     // height: 100%;
      margin: auto;
      z-index: 5;
      margin-top: 10vh;
      overflow: scroll;
      border-radius: 10px !important;
  
  
      position: relative;
      //top: 30%;
      //transform: translateY(-50%);
  
  
  
      @include media("<=dashbreak") {
        margin-left: 0 !important;
      }
    }
  
    &__body {
      background: white;
      //width: max-content;
      margin: auto;
     // height: max-content;
      border-radius: 5px;
      max-width: 500px !important;
      z-index: 4;
      
  
      @include media("<=t") {
        width: 90%;
      }
    }
  
    &__footer {
  
      display: flex;
      justify-content: flex-end;
      padding: 0 24px 24px 16px;
      height: fit-content;
      background: white ;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
  
      button {
        @include smallbutton;
        background: $lightaccent;
        border-radius: 5px;
        padding: 10px 24px;
  
        &:disabled {
          background-color: white !important;
        }
      }
    }
  }
  </style>