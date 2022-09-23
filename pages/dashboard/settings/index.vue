<template>
    <div class="settings">
        <template>
            <div class="password">
                <div class="password__container">
                    <div class="password__header">
                        <p>Change password</p>
                    </div>
                    <div class="password__body">
                        <div class="form-input">
                            <span class="error"></span>
                            <label for="">Old Password </label>
                            <input type="password" v-model="password.old_password"> 
                        </div>
                        <div class="form-input">
                            <span class="error"></span>
                            <label for="">New Password </label>
                            <input type="password" v-model="password.new_password"> 
                        </div>
                        <div class="form-input">
                            <span class="error"></span>
                            <label for="">Confirm Password </label>
                            <input type="password" v-model="password.confirm_password"> 
                        </div>
                        <button class="password__button">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            mode: '',
            password: {
                old_password: '',
                new_password: '',
                confirm_password: ''
            }
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Settings')
    }
}
</script>

<style lang="scss" scoped>
.settings {
    padding: 0 24px;
}
.form-input {
    @include plain-form-input;
}
.password {
    height: auto;
    background: white;
    &__container {
        
    }
    &__body {
        padding: 16px;
    }
    &__header {
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
        padding:  16px;
        p {
            font-size: 16px;
            font-weight: 400;
            color: grey;
        }
    }
    &__button {
        @include largebutton;
        width: auto;
        height: auto;
    }
}
</style>