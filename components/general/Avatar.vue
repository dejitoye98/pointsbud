<template>
  <div class="av">{{ initials }}</div>
</template>



<script>
export default {
  props: ["name"],
  computed: {
    initials() {
      if (this.name) {
        const split = this.name.split(" ");

        if (split[1]) {
          return split[0][0] + split[1][0];
        }
        return split[0][0];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $secondary;
  font-size: 14px;
  color: white;
  font-weight: 500;
  border: 2px solid white;
}
</style>