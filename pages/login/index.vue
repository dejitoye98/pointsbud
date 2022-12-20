<template>
  <div class="page">
    <Toast />

    <div class="header">
      <div class="header__container">
        <div class="logo">
          <Logo />
        </div>
      </div>
    </div>
    <template v-if="mode === 'login'">
      <div class="body">
        <h3 class="body__header">Login</h3>
        <span class="body__caption">Sign in to your Afflee dashboard</span>
        <span class="error">{{error}}</span>
        <div class="body__container">
          <div class="body__form">
            <div class="form-input">
              <label>Email</label>
              <input v-model="payload.email" type="text" />
            </div>
            <div class="form-input">
              <label>Password</label>
              <input v-model="payload.password" type="password" />
            </div>
            <div class="flex-row">
              <!--<label for class="check-label">
                <input v-model="remember" type="checkbox" />Remember me
              </label>-->
              <a href="#" @click="changeMode('forgot')">Forgot password</a>
            </div>

            <button :disabled="loading" @click="login">Sign in</button>

            <span class="already">
              Don't have have an account?
              <a
                :href="pageIntent ? `/register?${pageIntent}` : '/register'"
              >Sign Up</a>
            </span>
          </div>
        </div>
      </div>
    </template>

    <template v-if="mode === 'forgot'">
      <div class="body">
        <h3 class="body__header">Forgot Password</h3>
        <span
          class="body__caption"
          v-if="!forgot_success"
        >Enter your registered email address and we'll send you an email with a link to reset your password.</span>
        <span class="body__caption" v-else>Please check your email for a link to reset your password</span>
        <span class="error">{{error}}</span>

        <div class="body__container" v-if="!forgot_success">
          <div class="body__form">
            <div class="form-input">
              <label for="Email">Email Address</label>
              <input v-model="payload.email" type="text" />
            </div>
          </div>

          <button :disabled="loading" @click="executeForgotPassword">Go</button>
        </div>
        <a
          style="text-align:center; display: block; margin-top: 8px;"
          href="#"
          @click="changeMode('login')"
        >Go back to login</a>
      </div>
    </template>

    <template v-if="mode === 'activate'">
      <div class="verify">
        <span class="error">{{error}}</span>
        <div
          class="verify__instruction"
        >Please complete your registration by entering the 4-digit code that was sent to your email address.</div>
        <div class="verify__inputs">
          <input type="text" class="verify__inputs__input" v-model="verification_otp" />
          <!--
          <input class="verify__inputs__input" v-model="verification_otp[0]" type="text" />
          <input class="verify__inputs__input" v-model="verification_otp[1]" type="text" />
          <input class="verify__inputs__input" v-model="verification_otp[2]" type="text" />
          <input class="verify__inputs__input" v-model="verification_otp[3]" type="text" />-->
        </div>
        <div class="button-container">
          <button
            @click="activateAccount"
            :disabled="!verificationOtpFilled || loading"
          >Activate Account</button>
        </div>
        <p class="verify__resend" v-if="can_attempt_resend">
          Didn't get an email?
          <span class="red" @click="resendOtp">Resend OTP</span>
        </p>
        <p class="verify__resend" v-else>You can attempt resend in {{reattempt_in}} seconds</p>
      </div>
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mode: "login",
      error: "",

      verification_otp: "",

      loading: false,
      can_attempt_resend: false,
      forgot_success: false,
      reattempt_in: 30,
      payload: {
        email: "",
        password: ""
      },
      remember: false,
      logged_in_user: {},
      attemptInterval: null,
      resending: false
    };
  },
  computed: {
    pageIntent() {
      return this.$route.query.intent;
    },
    verificationOtpFilled() {
      return this.verification_otp.length === 4;
    }
  },
  created() {
    // Execute a function when the user presses a key on the keyboard
    window.addEventListener("keypress", event => {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        //document.getElementById("myBtn").click();
        this.login();
      }
    });
  },
  methods: {
    setReAttemptTimeout() {
      const vm = this;
      vm.can_attempt_resend = false;
      vm.reattempt_in = 30;
      this.attemptInterval = setInterval(() => {
        if (vm.reattempt_in !== 0) {
          vm.reattempt_in -= 1;
        } else {
          vm.can_attempt_resend = true;
          clearInterval(this.attemptInterval);
        }
      }, 1000);
    },
    resendOtp() {
      this.setReAttemptTimeout();

      this.$api
        .post("/users/resend-otp", {
          email: this.payload.email
        })
        .then(resp => {
          this.$store.dispatch("dashboard/actionShowSuccessToast", {
            message: "An email with your OTP has been sent"
          });
        })
        .catch(err => {
          const error = (err.response && err.response.data.data) || err;
          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: error
          }); // show error
        });
    },
    setUpPasteAndEnterOtpEvent() {
      const verify_inputs = window.document.getElementsByClassName(
        "verify__inputs__input"
      );
      if (verify_inputs) {
        for (let i = 0; i < verify_inputs.length; i++) {
          const input = verify_inputs[i];

          input.addEventListener("paste", event => {
            //input.removeEventListener('keydown')
            event.preventDefault();

            const text =
              event &&
              event.clipboardData &&
              event.clipboardData.getData("Text");
            // alert(text)
            if (text && text.length === 4 && !isNaN(parseInt(text))) {
              verify_inputs[0].value = text[0];
              verify_inputs[1].value = text[1];
              verify_inputs[2].value = text[2];
              verify_inputs[3].value = text[3];
            } else if (text.length === 1 && !isNaN(parseInt(text))) {
              input.value = text;
            }
          });
        }
      }
    },
    activateAccount() {
      this.error = "";
      let payload = {};
      this.loading = true;
      this.$api
        .post("/users/activate", {
          email: this.logged_in_user.email,
          token: this.verification_otp
        })
        .then(resp => {
          this.loading = false;
          this.login();
          // this.$router.push({ path: "/dashboard/campaigns" });
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.error = (err.response && err.response.data.data) || err;
          //this.$store.dispatch('auth/')
        });
    },
    goHome() {
      this.$router.push("/");
    },
    login(e = null) {
      if (e) {
        e.preventDefault();
      }
      if (!this.payload.email || !this.payload.password) {
        this.error = "Please enter all fields";
        return;
      }
      this.error = "";
      this.loading = true;
      this.$store
        .dispatch("auth/login", this.payload)
        .then(async resp => {
          this.error = "";
          this.loading = false;
          this.$cookies.remove("aff-token");
          window.localStorage.setItem("aff-token", resp.data.data.token);

          await this.$cookies.set("aff-token", resp.data.data.token);

          this.logged_in_user = resp.data.data;
          if (this.logged_in_user.email_verified) {
            window.open("/dashboard/campaigns", "_self");
          } else {
            this.resendOtp();
            this.mode = "activate";
            //dthis.setUpPasteAndEnterOtpEvent()
          }
        })
        .catch(err => {
          this.loading = false;
          this.error = (err.response && err.response.data.data) || err;
        });
    },
    changeMode(mode) {
      this.mode = mode;
    },

    executeForgotPassword() {
      this.loading = true;
      if (!this.payload.email) {
        this.error = "Enter your email";
        this.loading = false;
        return;
      }
      this.$api
        .post("/auth/forgot-password", this.payload)
        .then(resp => {
          this.error = "";
          this.forgot_success = true;
          this.loading = false;
        })
        .catch(err => {
          this.forgot_success = false;
          this.loading = false;
          this.error = (err.response && err.response.data.data) || err;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.already {
  display: block;
  font-size: 15px;
  color: $faint;
  text-align: center;

  a {
    color: $lightaccent !important;
    text-decoration: none;
  }
}
.verify {
  text-align: center;
  margin-top: 50px;
  width: 100%;

  &__resend {
    font-size: 15px;
    color: $faint;
    font-weight: 300;
    width: 90%;
    margin: auto;
    margin-bottom: 8px;
    cursor: pointer;

    span {
      color: $primary;
    }
  }

  &__instruction {
    font-size: 16px;
    font-weight: 300;
    width: 90%;
    margin: auto;
    margin-bottom: 8px;
  }
  &__inputs {
    display: flex;
    width: 50%;
    justify-content: space-between;
    margin: auto;

    input {
      @include plain-form-input;
      width: 100%;
      height: 70px;
      display: block;
      border-radius: 5px;
      text-align: center;
      border: 2px solid lightgrey;

      @include media("<=t") {
        width: 40px;
        height: 40px;
      }
      &:focus {
        outline-color: $primary;
      }
    }
  }
  button {
    @include largebutton;
  }
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  @include media("<=t") {
    width: 80% !important;
    margin: auto;
  }
}

.header {
  //width: 80%;
  //margin: auto;
  padding: 16px 0;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

  &__container {
    @include container;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.logo {
  //margin-bottom: 40px;
  cursor: pointer;
  padding: 0 36px;

  img {
    object-fit: contain;
    height: auto;
    margin: auto;
    margin-bottom: 50px;
    width: 120px !important;
    margin: 0;
  }
}
.form-input {
  @include form-input;
}
.check-label {
  color: $faint;
  font-size: 14px;
  display: flex;
  align-items: center;

  input {
    margin-right: 5px;
  }
}

a {
  color: $lightaccent;
  font-size: 14px;
}

.flex-row {
  display: flex;
  justify-content: space-between;
  margin-top: -12px;
  margin-bottom: 24px;

  @include media("<=t") {
    margin-bottom: 16px;
  }
}

.body {
  width: 50%;
  margin: auto;
  margin-top: 50px;

  @include media("<=t") {
    width: 70%;
  }
  &__caption {
    color: $faint;
    font-size: 14px;
    margin-bottom: 16px;
    display: block;
    text-align: center;
  }

  &__header {
    text-align: center;
    font-size: 30px;
    margin-bottom: 8px;
    font-weight: 600;

    @include media("<=t") {
      font-size: 20px;
    }
  }
  span {
    display: block;
    text-align: center;
  }

  &__container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  &__form {
    width: 100%;
  }
  button {
    @include largebutton;
    width: 100%;
  }
}

.error {
  @include error;
  font-size: 14px;
}
</style>