<template>
  <div class="page">
    <div class="page__container">
      <div class="page__header">
        <p>Oops! 😑</p>
      </div>
      <div class="page__caption">
        <p>404 - page not found</p>
        <p>The page you are looking for might be removed or the campaign is deactivated.</p>
      </div>

      <button @click="homepage">Go to homepage</button>
    </div>

    <div class="notfound"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    homepage() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  display: flex;
  justify-content: center;

  &__container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    width: 50%;
    @include media("<=t") {
      width: 90%;
    }
  }
  &__header {
    font-size: 50px;
    color: $primary;
    text-align: center;
    @include media("<=t") {
      font-size: 30px;
    }
  }

  &__caption {
    text-align: center;
    margin-top: 20px;
    line-height: 1.5;

    p {
      color: $faint;
      font-size: 20px;
      line-height: 1.5;
      &:first-of-type {
        font-size: 30px;
        margin-bottom: 15px;
      }
    }
  }
}

button {
  @include largebutton;
  margin-top: 50px !important;
  margin: auto;
}
</style>