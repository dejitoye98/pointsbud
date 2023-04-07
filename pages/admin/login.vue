<template>
  <div class="page">
    <div class="nav">
      <div class="nav__logo">Loyalyt</div>
    </div>
    <template>
      <div class="login">
        <div class="login__container">
          <div class="form">
            <div class="form-input">
              <label for>Email</label>
              <input v-model="payload.email" type="text" />
            </div>
            <div class="form-input">
              <label for>Password</label>
              <input v-model="payload.password" type="password" />
            </div>
            <button @click="login" :disabled="loading">Login</button>
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
      loading: false,
      payload: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$api
        .post("/auth/admin/login", this.payload)
        .then(resp => {
          this.$cookies.set("loyal-token", resp.data.data.token);
          window.open("/admin/dashboard", "_self");
        })
        .finally(() => {
          this.loading = false;
        });
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
}</style>