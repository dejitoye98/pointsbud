

<template>
  <div class="layout">
    <div class="layout__container">
      <div class="notifications" v-if="filteredNotifications.length > 0">

        <AdminNotification @close="closeNotification" v-for="(notification, index) in filteredNotifications"
          :notification="notification" :key="index">

        </AdminNotification>
      </div>
      <div class="topbar">
        <!--<AdminTopbar></AdminTopbar>-->
        <AdminSidebar></AdminSidebar>
      </div>
      <div class="main">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    /*setInterval(() => {

      //this.getNotifications()
    }, 1000)*/
  },
  data() {
    return {
      notifications: []
    }
  },
  computed: {
    filteredNotifications() {
      //let notifs = [];
      return this.notifications.filter(n => n.show === true);
    }
  },

  methods: {
    closeNotification(id) {
      const notification = this.notifications.find(a => a.id === id);
      //notification.show = false;
      this.$set(notification, "show", false)
      this.readNotification(id).then(resp => {
        this.$set(notification, "show", false)
      })
    },
    getNotifications() {
      this.$api.get('/notifications/admin?type=new').then(resp => {
        //this.notifications = resp.data.data;
        resp.data.data.map(n => {
          n.show = n.seen == 0
        })
        this.notifications = resp.data.data;
      })
    },
    readNotification(id) {
      return this.$api.put(`/notifications/${id}/admin/read`).then(resp => {
      })
    }
  }
}
</script>

<style lang="scss">
#__nuxt {
  background: $dashboard-background-color;

}

body {
  background: $dashboard-background-color;

}

.layout {
  height: 100%;
  width: 100%;
  background: $dashboard-background-color;
  font-family: 'Red Hat Display' !important;
  letter-spacing: 0.5px;

  &__container {
    display: flex;
    //flex-direction: column;
    height: 100%;
    //justify-content: space-between;
    //align-items: stretch;
  }
}

.sidebar {
  height: 100%;
  width: 220px;
}

.main {
  width: 80%;
  margin: auto;
  padding-top: 36px;
}

.notifications {
  background: transparent;
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
  display: flex;
  z-index: 10000000;
  padding: 16px;
  background: rgba(211, 211, 211, 0.342);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 100%;



}
</style>