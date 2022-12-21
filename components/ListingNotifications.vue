<template>
  <div class="notifications">
    <ul class="notifications__listing">
      <li
        @click="resolveNotificationLink(index)"
        v-for="(notification, index) in notifications"
        :key="notification.id"
        class="notifications__listing__item"
        :class="[notification.read === 0 ? 'unread' : '']"
      >
        {{notification.notification_text}}
        <span>{{formatDate(notification.createdAt)}}</span>
      </li>
    </ul>
    <pagination
      :records="pagination && pagination.total || 0"
      v-model="page"
      :per-page="pagination.page_size"
      @paginate="callback"
    ></pagination>
  </div>
</template>


<script>
import moment from "moment";
import Pagination from "vue-pagination-2";

export default {
  components: {
    Pagination
  },
  created() {
    console.log("got here");
    this.markNotificationsAsRead();
  },
  props: ["notifications", "pagination"],
  data() {
    return {
      page: (this.pagination && this.pagination.current_page) || 1
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    callback() {
      return "";
    },
    markNotificationsAsRead() {
      console.log("marking notifis");
      this.$store
        .dispatch("dashboard/readNotifications", this.getReadNotificationIds)
        .then(resp => {})
        .catch(e => {});
    },
    resolveNotificationLink(index) {
      const notification = this.notifications[index];
      let url;
      switch (notification.source_model) {
        case "campaign_marketers":
          url = `/dashboard/campaigns/${notification.source_model_id}/marketers`;
          break;
        default:
          url = `/dashboard/campaigns/${notification.source_model_id}`;
      }

      this.$router.push(url);
    }
  },
  computed: {
    getReadNotificationIds() {
      const ids = this.notifications.map(a => a.id);
    }
  }
};
</script>


<style lang="scss" scoped>
.unread {
  background: rgba(255, 186, 186, 0.212) !important;
}
.notifications {
  display: flex;
  flex-direction: column;
  &__listing {
    &__item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background: white;
      padding: 16px 16px;
      border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
      color: black;
      font-size: 16px !important;
      font-weight: 500;

      span {
        font-size: 13px;
        color: grey;
      }
    }
  }
}
</style>