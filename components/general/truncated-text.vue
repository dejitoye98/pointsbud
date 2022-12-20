<template>
  <p v-if="text && limit">
    {{computedText}}
    <template v-if="text.length > limit">
      <span
        class="red"
        style="color:#DD6B6B; cursor:pointer"
        v-if="truncated"
        @click="untruncateText"
      >read more</span>
      <span class="red" style="color:#DD6B6B; cursor:pointer" v-else @click="truncateText">see less</span>
    </template>
  </p>
</template>


<script>
export default {
  props: ["text", "limit"],
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
.red {
  color: $primary !important;
}
</style>