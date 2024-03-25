<template>
    <div class="page">
        <div class="form">
            <div class="logo">
                <Logo></Logo>
            </div>

            <div class="card">
                <div class="form-input">
                    <label>Email</label>
                    <input class="" v-model="payload.email">
                </div>
                <div class="form-input">
                    <label>Password</label>
                    <input class="" type="password" v-model="payload.password">
                </div>

                <div class="cta">
                    <button @click="login" :disabled="loading">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            payload: {

            },
            loading: false,
        }
    },
    methods: {
        login() {
            this.loading = true;
            this.$api.post('/superadmin/login', this.payload).then(resp=> {
                const user = resp.data.data.user;
                this.$cookies.set("usertoken", resp.data.data.token);
                window.localStorage.setItem('userDetails', JSON.stringify(user));

                
                this.$router.push('/superadmin/dashboard/properties');
        
                //alert(window.localStorage.getItem('businessDetails'))
              //  return
               //window.open("/dashboard", "_self");
            }).catch(e=> {
                alert(e)
            }).finally(() => {
                this.loading = false;
            })
        },
    }
}

</script>

<style lang="scss" scoped>
.page{
    background-color: whitesmoke;
    min-height: 100vh;
}

.form {
    display: block;
    margin: auto;
    width: 50%;

    @include media("<=t") {
        width: 90%;
    }
}
.logo {
    display: flex;
    justify-content: center;
    padding-top: 20vh;
    margin-bottom: 20px;
}

.form-input {
    background-color: white;
    @include plain-form-input;
}
.card {
    background-color: white;
    width: 100%;
    //border: 1px solid grey;
    padding: 24px;
    border-radius: 20px
}

.cta {
    button {
        @include normalbutton;
    }
}
</style>