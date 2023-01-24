<template>
  <div class="el">
    <div class="el__container desktop">
      <div class="lead">
        <div class="back"></div>
        <div class="title">
          <div class="title__back" @click="goBack">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 12H3.67004"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="title__text">{{ dashboardTitle }}</p>
        </div>
      </div>

      <div class="business-name">
        <p>{{ userDetails && userDetails.name }}</p>
      </div>

      <div class="el__end">
        <div>
          <!-- <button v-if="active === 'Campaigns'" @click="createCampaign">Create new campaign</button> -->
          <!-- <button v-if="userContext === 'business' && typeof(show_create_button) ===  'undefined' " @click="createCampaign">Create new campaign</button> -->
        </div>
        <!--<div class="el__end__notif" @click="openNotification">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z"
                            stroke="grey"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                        />
                        <path
                            d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z"
                            stroke="grey"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
                            stroke="grey"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                        />
                    </svg>
                    <span v-if="unread_notifications_length > 0">{{
                        unread_notifications_length
                    }}</span>
        </div>-->
        <div class="el__end__image" @click="openImageDropdown">
          <img
            src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg'"
            alt
          />
        </div>
      </div>
    </div>
    <div class="el__container el__container--mobile mobile">
      <div @click="toggleMobileMenu" class="menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 7H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
          <path d="M3 12H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
          <path d="M3 17H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <div class="logo">
        <img src="../static/logo.svg" alt />
      </div>
      <div class="end">
        <div>
          <!-- <button v-if="active === 'Campaigns'" @click="createCampaign">Create new campaign</button> -->
          <!--
          <button
            v-if="userContext === 'business' && typeof(show_create_button) ===  'undefined' "
            @click="createCampaign"
          >Create new campaign</button>-->
        </div>
        <div class="notif" @click="openNotification">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z"
              stroke="grey"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z"
              stroke="grey"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
              stroke="grey"
              stroke-width="1.5"
              stroke-miterlimit="10"
            />
          </svg>
          <span v-if="unread_notifications_length > 0">
            {{
            unread_notifications_length
            }}
          </span>
        </div>
      </div>

      <div class="mobile-menu" @click.stop="toggleMobileMenu" v-if="show_mobile_menu">
        <div class="mobile-menu__container">
          <div class="mobile-menu__header">
            <div class="mobile-menu__header__image">
              <img
                src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
                alt
              />
            </div>
            <div class="mobile-menu__header__detail">
              <p>{{userDetails && userDetails.name}}</p>
              <p>{{userDetails && userDetails.email}}</p>
              <template v-if="userContext === 'marketer'">
                <a
                  href="/dashboard/my-profile"
                  v-if="userContext === 'marketer'"
                  style="cursor: pointer"
                >View profile</a>
                &middot;
              </template>
              <a @click="logout" style="cursor: pointer">Logout</a>
            </div>
          </div>
          <div class="mobile-menu__body">
            <sidebar-item :text="'Overview'" link="/overview" />
            <sidebar-item :text="'Campaigns'" link="/campaigns" />
            <sidebar-item v-if="context === 'marketer'" :text="'Earnings'" link="/earnings" />
            <sidebar-item v-if="context === 'marketer'" :text="'Bio Links'" link="/inventory" />
            <sidebar-item :text="'Wallet'" link="/wallet" />
            <sidebar-item :text="'Settings'" link="/settings" />
          </div>
        </div>
      </div>
    </div>
    <div class="el__dropdown">
      <div
        id="image"
        class="el__dropdown__item el__dropdown__item--image"
        v-if="show_dropdown === 'image'"
      >
        <ul>
          <li @click="goProfile">Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>
      <div
        id="notification"
        class="el__dropdown__item el__dropdown__item--notification"
        v-else-if="show_dropdown === 'notification'"
      >
        <ul>
          <li
            v-for="notification in notifications"
            :key="notification.id"
            :class="[notification.read == 0 ? 'unread' : '']"
          >
            {{ notification.notification_text }}
            <span>{{ formatDate(notification.createdAt) }}</span>
          </li>
          <li
            v-if="
                            notifications.length <
                                static_unread_notifications_length ||
                            notifications.length < notification_length
                        "
            style="text-align: center; cursor: pointer"
            id="see-all"
            @click="triggerSeeAllNotifications"
          >See all notifications</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop {
  display: none !important;
  @include media(">=dashbreak") {
    display: flex !important;
  }
}

.mobile {
  display: none !important;
  @include media("<=dashbreak") {
    display: flex !important;
  }
}

.business-name {
  font-size: 16px;
  font-weight: 500;
}
#see-all {
  background: #e3a09e62;
  color: black;
  font-size: 16px;
}
.active-dropdown {
  opacity: 1 !important;
}
.unread {
  background: rgba(255, 186, 186, 0.212);
}
.el {
  width: 100%;
  //background: white;
  //box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  z-index: 1000000000000000;
  background: white !important;
  //margin-left: -20px;
  position: sticky;
  top: 0;
  left: 0;

  &__dropdown {
    position: relative;
    //border: 1px solid black;
    margin-top: -10px;
    //max-height: 90vh;
    //height: 100px;
    z-index: 10;

    &__item {
      //border: 1px solid lightgrey;
      background: white;
      //border: rgba(211, 211, 211, 0.263) 1px solid ;
      //box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transition: all 0.3s ease-in-out;
      border: 0.5px solid lightgray;

      &--image {
        position: absolute;
        top: 20;
        right: 0px;
      }
      &--notification {
        position: absolute;
        top: 20;
        right: 15px;
        color: grey;

        li {
          padding: 20px 30px !important;
          display: flex;
          flex-direction: column;
          color: black;

          span {
            font-size: 13px;
            color: grey;
          }
        }

        &--unread {
          background: $lightaccent;
        }
      }
      li {
        cursor: pointer;
        padding: 10px 50px;
        border-bottom: rgba(211, 211, 211, 0.263) 1px solid;
      }
    }
  }

  &__container {
    width: 100%;
    display: flex;
    padding: 2px 16px;
    //padding-left: 16px;
    //padding
    justify-content: space-between;
    align-items: center;
  }
  &__end {
    height: 100%;
    justify-self: end;
    display: flex;
    align-items: center;

    button {
      font-size: 16px !important;
    }

    div {
      margin-right: 15px;
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
    }

    &__notif {
      position: relative;
      //border: 1px solid black;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 99;
      }
      span {
        width: 25px;
        height: 25px;
        background: $darkshade;
        cursor: pointer;
        z-index: 100;
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &__image {
      width: 30px;
      height: 30px;

      img {
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  button {
    @include smallbutton;
    //width: 50px;
    margin-right: 20px;
    font-size: 14px;
    padding: 8px;
    height: auto !important;
    font-weight: 400;
    width: auto !important;
    color: white;
    border-radius: 5px;
    min-height: auto;
    cursor: pointer;
    margin-bottom: 0;
  }
}

.title {
  padding: 8px 16px;
  display: flex;
  align-items: center;

  &__back {
    margin-right: 10px;
    cursor: pointer;
  }
  &__text {
    font-size: 16px;
    color: $faint;
    font-weight: 300;
    //letter-spacing: 0.10rem;
  }
}

.el__container--mobile {
  @include card;

  .menu {
    width: 20%;
  }
  .logo {
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: center;
    padding: 8px 0;
    img {
      width: 100px;
    }
  }
  .end {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .notif {
    position: relative;
    width: 30px;
    height: 30px;
    svg {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    span {
      position: absolute;
      width: 15px;
      background: red;
      border-radius: 50%;
      height: 15px;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      color: white;
      align-items: center;
      font-size: 13px;
    }
  }
  .mobile-menu {
    position: fixed;
    padding: 16px 16px;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;

    &__container {
      min-width: 50%;
      min-height: 100vh;
      position: absolute;
      top: 0;
      box-sizing: border-box;
      left: 0;
      background: white;
      //padding: 16px;
      box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
        rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    }

    &__header {
      //height: 400px;
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid rgba(211, 211, 211, 0.21);
      margin-top: 20px;
      padding: 24px 16px 24px 16px;

      &__detail {
        font-size: 13px;
        color: $charcoal;
        margin-left: 5px;
        a {
          color: $primary;
        }
      }

      &__image {
        //idth: 50%;
        margin-right: 5px;

        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
      }
    }

    &__body {
      padding-top: 36px;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";

import moment from "moment";

export default {
  props: ["show_create_button", "context"],
  data() {
    return {
      show_dropdown: "",
      show_mobile_menu: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.show_mobile_menu = !this.show_mobile_menu;
    },
    goBack() {
      window.history.back();
    },
    goProfile() {
      this.$router.push("/my-profile");
    },
    triggerSeeAllNotifications() {
      this.$router.push("/dashboard/notifications");
    },
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },

    createCampaign() {
      // this.$store.commit('dashboard/setCreateCampaign', true)
      this.$router.push("/dashboard/campaigns/new");
    },

    openNotification() {
      this.$router.push("/dashboard/notifications");
      if (this.show_dropdown == "notification") {
        this.show_dropdown = "";
        return;
      }
      this.show_dropdown = "notification";
      this.$store.dispatch("dashboard/readNotifications", {
        notifs: this.getUnreadNotificaitionIds
      });
    },
    openImageDropdown() {
      if (this.show_dropdown == "image") {
        this.show_dropdown = "";

        return;
      } else {
        this.show_dropdown = "image";
      }
    },
    logout() {
      this.$api
        .post("/auth/logout")
        .then(resp => {
          window.localStorage.removeItem("afUserDetails");
          this.$cookies.remove("aff-token");

          this.$router.push("/login");
        })
        .catch(err => {});
    }
  },
  computed: {
    userDetails() {
      return (
        window.localStorage.getItem("afUserDetails") &&
        JSON.parse(window.localStorage.getItem("afUserDetails"))
      );
    },
    userContext() {
      return window.localStorage.getItem("afContext");
    },
    ...mapGetters("dashboard", [
      "dashboardTitle",
      "active",
      "notifications",
      "notification_length",
      "unread_notifications_length",
      "static_unread_notifications_length"
    ]),
    getUnreadNotificaitionIds() {
      const notifs = this.notifications;
      const unread = notifs.filter(n => n.read === 0);
      const ids = unread.map(i => i.id);
      return ids;
    }
  }
};
</script>
