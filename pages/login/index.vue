<template>
  <div class="page">
    <div class="nav">
      <div class="nav__logo">Loyalyt</div>
    </div>
    <template v-if="!is_loggedin">
      <div class="login">
        <div class="login__container">
          <div class="form">
            <div class="form-input">
              <label for>Email/Phone/Loyalty Code</label>
              <input type="text" />
            </div>
            <div class="form-input">
              <label for>Password</label>
              <input type="text" />
            </div>
            <button @click="login">Login</button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="choices">
        <div class="choices__container">
          <h2>Choose Account</h2>
          <div class="choice" @click="goToBusiness">
            <img
              src="https://theboroughlagos.com/wp-content/uploads/2018/10/Artboard-1-copy.png"
              alt
            />
            <p>Circa Lagos</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_loggedin: false
    };
  },
  methods: {
    login() {
      this.is_loggedin = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  background: $dashboard-background-color;
  min-height: 100vh;
}
.nav {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
}

.login {
  &__container {
    padding: 50px 16px;
  }
}

.form {
  width: 40%;
  margin: auto;
  @include card;
  padding: 36px;
  button {
    @include smallbutton;
    font-size: 16px;
    width: 100%;
    padding: 16px;
    margin-top: 16px;
  }
}

.form-input {
  @include plain-form-input;
}

.choices {
  margin-top: 5vh;

  &__container {
    width: 50%;
    margin: auto;
    padding: 16px;
  }
}

.choice {
  border-radius: 10px;
  width: 300px;
  margin: auto;
  margin-bottom: 8px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid rgba(211, 211, 211, 0.514);
  cursor: pointer;

  &:hover {
    @include card;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: $charcoal;
  }
}

h2 {
  width: 100%;
  text-align: center;
  font-size: 25px;
  color: $faint;
  margin-bottom: 16px;
}
</style>