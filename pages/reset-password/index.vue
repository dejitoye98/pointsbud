<template>
    <div class="page">
        <div class="header"></div>
        <template>
            <div class="body">
                <h3 class="body__header">Reset Password</h3>
                <span class="body__caption">Reset your password to regain access to your Afflee dashboard. </span>
                <span class="error">{{error}}</span>
                <div class="body__container">
                    <div class="body__form">
                        <div class="form-input">
                            <label>New Password</label>
                            <input v-model="payload.password" type="password">
                        </div>
                        <div class="form-input">
                            <label>Confirm Password</label>
                            <input v-model="payload.confirm_password" type="password">
                        </div>
                        

                        <button :disabled="loading" @click="resetPassword">Reset password</button>
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
            error: '',
            success: false,

            loading: false,
            payload: {
                token: this.$route.query.token,
                email: this.$route.query.email,
                password: '',
                confirm_password: ''
            },
        }
    },

    created() {
        if (!this.$route.query.email || !this.$route.query.token) {
            this.error = "Invalid request to reset password"
        }
    },


    methods: { 
        resetPassword() {
            this.loading = true;
            this.error = '';
            this.success = false;
            this.payload.email = decodeURIComponent(this.payload.email)
            
            if (!this.payload.password || !this.payload.confirm_password) {
                this.error = "Passwords must be provided"
                this.loading = false;
                return
            }
            if (this.payload.password !== this.payload.confirm_password) {
                this.error = "Passwords must match";
                this.loading = false;
                return;
            }

            this.$api.post('/auth/reset-password', this.payload)
                .then(resp => {
                    this.loading = false;
                    this.success = true;
                    this.$router.push('/login')
                })
                .catch(err=> {
                    this.loading = false;
                    this.success = false;
                    this.error = err && err.response && err.response.data.data || err
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