<template>
    <p :style="{color: color || 'black'}" v-if="text && limit">
      {{ computedText }}
      <template v-if="text.length > limit">
        <span class="red" style="cursor:pointer" v-if="truncated" @click="untruncateText">see more</span>
        <span class="red" style="cursor:pointer" v-else @click="truncateText">see less</span>
      </template>
    </p>
  </template>
  
  
  <script>
  export default {
    props: ["text", "limit", 'color'],
    data() {
      return {
        truncated: true
      };
    },
  
    methods: {
      truncateText() {
        this.truncated = true;
        let text = "";
        if (this.text) {
          text = this.text.slice(0, this.limit);
          if (this.text.length > this.limit) {
            text += "...";
          }
  
          return text;
        }
        return "";
      },
      untruncateText() {
        this.truncated = false;
        if (this.text) return this.text;
        return "";
      }
    },
    computed: {
      computedText() {
        if (this.truncated && this.text) {
          return this.truncateText();
        } else {
          return this.untruncateText();
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  p {
    font-size: 14px;
  }
  
  span {
    font-size: 14px;
  }
  
  .red {
    color: $primary;
  
  }
  </style>