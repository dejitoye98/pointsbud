<template>
    <div>
        <base-tabs 
            :params="params"
            :business_tabs="business_tabs"
            ></base-tabs>
    </div>
</template>

<script>
export default {
    props: ["params"],
    data() {
        return{
            
            marketer_tabs: [],
            business_tabs: [{
                name: 'Info',
                route: '/dashboard/products/:id'

            }, {
                name:"Orders",
                route: '/dashboard/products/:id/orders'

            }, {
                name: "Sales",
                route: '/dashboard/products/:id/sales'

            }, ]
        }
    },
    computed: {
        userContext() {
            return window.localStorage.getItem('afContext');
        },
        userDetails() {
            return JSON.parse(window.localStorage.getItem('afUserDetails'));
        },
        canChangePassword() {
            return this.password.old_password && this.password.new_password && this.password.confirm_password && (this.password.new_password === this.password.confirm_password);
        }
    },
}
</script>