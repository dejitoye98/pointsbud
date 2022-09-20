<template>
    <div class="page">
        <div class="header"></div>
        <template v-if="mode === 'login'">
            <div class="body">
                <h3 class="body__header">Login</h3>
                <span class="body__caption">Sign in to your Afflee dashboard </span>
                <span class="error">{{error}}</span>
                <div class="body__container">
                    <div class="body__form">
                        <div class="form-input">
                            <label>Email</label>
                            <input v-model="payload.email" type="text">
                        </div>
                        <div class="form-input">
                            <label>Password</label>
                            <input v-model="payload.password" type="password">
                        </div>
                        <div class="flex-row">
                            <label for="" class="check-label"><input  v-model="remember" type="checkbox">Remember me</label>
                            <a href="#" @click="changeMode('forgot')">Forgot password</a>
                        </div>

                        <button :disabled="loading" @click="login">Sign in</button>
                    </div>

                </div>
            </div>
        
        </template>

        <template v-if="mode === 'forgot'">
            <div class="body">
                <h3 class="body__header">Forgot Password</h3>
                <span class="body__caption" v-if="!forgot_success">Enter your registered email address and we'll send you an email with a link to reset your password.</span>
                <span class="body__caption" v-else>Please check your email for a link to reset your password</span>
                <span class="error">{{error}}</span>

                <div class="body__container" v-if="!forgot_success">
                    <div class="body__form">
                        <div class="form-input">
                            <label for="Email"> Email Address</label>
                            <input v-model="payload.email" type="text">
                        </div>
                    </div>

                    <button :disabled="loading" @click="executeForgotPassword">Go</button>

                </div>
                <a style="text-align:center; display: block; margin-top: 8px;" href="#" @click="changeMode('login')">Go back to login </a>
            </div>

        </template>
    </div>
</template>


<script>
export default {
    data() {
        return {
            mode: 'login',
            error: '',


            loading: false,
            forgot_success: false,
            payload: {
                email: '',
                password: '',
            },
            remember: false,
        }
    },
    methods: {
        login() {
            this.loading = true;
            this.$store.dispatch('auth/login', this.payload)
                .then(resp => {
                    this.error = '';
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    this.error= err.response && err.response.data.data || err
                })
            /*this.$api.post('/auth/login', this.payload)
                .then(resp=> {
                    this.error = '';
                    this.loading = false;
                })
                .catch(err=> {
                    this.loading = false;
                    this.error= err.response && err.response.data.data || err
                })*/
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
            this.$api.post('/auth/forgot-password', this.payload)
                .then(resp=> {
                    this.error = '';
                    this.forgot_success = true;
                    this.loading = false;
                })
                .catch(err=> {
                    this.forgot_success = false;
                    this.loading = false;
                    this.error= err.response && err.response.data.data || err
                })       
        }
        
    }
}
</script>

<style lang="scss" scoped>

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