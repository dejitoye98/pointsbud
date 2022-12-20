<template>
  <div>
    <base-tabs :business_tabs="business_tabs"></base-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      business_tabs: [
        {
          name: "Preferences",
          route: "/dashboard/settings/preferences"
        },
        {
          name: "Team",
          route: "/dashboard/settings/team"
        },
        {
          name: "Integration",
          route: "/dashboard/settings/integration"
        },
        {
          name: "Bank Account",
          route: "/dashboard/settings/bank-accounts"
        },
        {
          name: "Password",
          route: "/dashboard/settings/password"
        }
      ]
    };
  },
  computed: {
    userContext() {
      return window.localStorage.getItem("afContext");
    },
    userDetails() {
      return JSON.parse(window.localStorage.getItem("afUserDetails"));
    },
    canChangePassword() {
      return (
        this.password.old_password &&
        this.password.new_password &&
        this.password.confirm_password &&
        this.password.new_password === this.password.confirm_password
      );
    }
  }
};
</script>