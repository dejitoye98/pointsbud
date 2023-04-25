

<template>
  <div class="layout">
    <div class="layout__container">
      <div class="notifications" v-if="filteredNotifications.length > 0">

        <AdminNotification :socket="socketClient" @close="closeNotification"
          v-for="(notification, index) in notifications" :notification="notification" :key="index">

        </AdminNotification>
      </div>
      <div class="topbar">
        <AdminTopbar></AdminTopbar>
        <!--  <AdminSidebar></AdminSidebar> -->
      </div>
      <div class="main">
        <Nuxt :socket="socketClient" />
      </div>
    </div>
  </div>
</template>

<script>
import socket from "socket.io-client"
import { mapGetters } from "vuex";

export default {
  created() {
    /*setInterval(() => {

      //this.getNotifications()
    }, 1000)*/
    this.$store.commit('dashboard/setActive', "Customers")
  },
  data() {
    return {
      socketClient: null,
      business_slug: ''

    }
  },
  computed: {
    ...mapGetters("notifications", ['notifications']),
    ...mapGetters("updates", ['updateItems']),
    filteredNotifications() {
      //let notifs = [];
      return this.notifications.filter(n => n.show === true || !n.seen);
    }
  },

  mounted() {
    this.$store.dispatch('updates/getUpdates')
    this.socketClient = socket(this.$config.SOCKET_BASE);
    //console.log(this.socketClient)// Replace with your server URL
    // Add your event handlers here
    this.socketClient.on('connect', () => {
      console.log('Connected to server');
      this.getBusiness()
    });

    this.socketClient.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socketClient.on('created_porder', (data) => {
      //alert('got porder!!')
      //this.notifications.unshift(data)
      this.$store.commit('notifications/setNotifications', [data, ...this.notifications])
    })






  },

  methods: {

    getBusiness() {
      this.$api.get('/auth/admin/self').then(resp => {
        this.business_slug = resp.data.data.slug
        this.socketClient.emit('join_room', { room: `orders:${this.business_slug}` })
      })
    },
    closeNotification(id) {
      const notification = this.notifications.find(a => a.id === id);

      this.$store.commit('notifications/setNotifications', this.notifications.filter(n => n.id !== notification.id))
      /*this.readNotification(id).then(resp => {
        this.$set(notification, "show", false)
      })*/
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
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: stretch;
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