<template>
  <div class="profile">
    <div class="profile__container">
      <template v-if="!loading">
        <div class="profile__header">
          <img v-if="user.profile_photo" :src="user.profile_photo" class="logo" alt />
          <img
            v-else
            class="logo"
            alt
            src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
          />
        </div>
        <div class="profile__bio">
          <p v-if="user.bio">{{user.bio}}</p>
          <p v-else>No bio</p>
        </div>
        <div class="profile__details">
          <div class="profile__details__item">
            <p>Name</p>
            <p>{{user.name}}</p>
          </div>
          <div class="profile__details__item">
            <p>Industries</p>
            <p v-if="user.industries">{{user.industries.join(',')}}</p>
            <p v-else>Fashion</p>
          </div>
          <div class="profile__details__item" v-if="user.social_stats">
            <p>Facebook</p>
            <p v-if="user.socials">{{JSON.parse(user.social).facebook}}</p>
            <p
              v-if="user.social_stats && JSON.parse(user.social_stats).facebook"
            >~ {{user.social_stats ? JSON.parse(user.social_stats).facebook.following : 'undefined'}}</p>
          </div>
          <div class="profile__details__item" v-if="user.social_stats">
            <p>Instagram</p>
            <p v-if="user.socials">{{JSON.parse(user.social_stats).instagram}}</p>
            <p
              v-if="user.social_stats && JSON.parse(user.social_stats).instagram"
            >~ {{user.social_stats ? JSON.parse(user.social_stats).instagram.following : 'undefined'}}</p>
          </div>
          <div class="profile__details__item" v-if="user.social_stats">
            <p>Tiktok</p>
            <p v-if="user.socials">{{JSON.parse(user.social_stats).tiktok}}</p>
            <p
              v-if="user.social_stats && JSON.parse(user.social_stats).tiktok"
            >~ {{user.social_stats ? JSON.parse(user.social_stats).tiktok.following : 'undefined'}}</p>
          </div>
          <div class="profile__details__item" v-if="user.social_stats">
            <p>Twitter</p>
            <p v-if="user.socials">{{JSON.parse(user.social_stats).twitter}}</p>
            <p
              v-if="user.social_stats && JSON.parse(user.social_stats).twitter"
            >~ {{user.social_stats ? JSON.parse(user.social_stats).twitter.following : 'undefined'}}</p>
          </div>
          <div class="profile__details__item" v-if="user.social_stats">
            <p>Youtube</p>
            <p v-if="user.socials">{{JSON.parse(user.social_stats).youtube}}</p>
            <p
              v-if="user.social_stats && JSON.parse(user.social_stats).youtube"
            >~ {{user.social_stats ? JSON.parse(user.social_stats).youtube.following : 'undefined'}}</p>
          </div>
        </div>
        <div class="profile__cta">
          <button @click="profileAction">Invite to campaign</button>
        </div>
      </template>
      <template v-else>
        <div style="height: 100%;">
          <Loading />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user_type", "user_id"],
  data() {
    return {
      loading: false,
      user: {}
    };
  },
  watch: {
    user_id(value) {
      this.getUser();
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    profileAction() {
      this.$emit("onAction", this.user_id);
    },
    getUser() {
      this.loading = true;
      this.$api
        .get(`/users?type=${this.user_type}&id=${this.user_id}`)
        .then(resp => {
          this.user = resp.data.data;
          this.loading = false;
          //alert(JSON.stringify(resp))
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  margin: auto;
  height: 100%;
  overflow: scroll;
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &__header {
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__bio {
    border-top: 1px solid rgba(211, 211, 211, 0.417);
    border-bottom: 1px solid rgba(211, 211, 211, 0.417);
    text-align: center;
    padding: 20px 0px;
    margin-top: 5px;
    color: $charcoal;
  }

  &__details {
    display: grid;
    grid-template-columns: 49% 49%;
    padding: 20px 0px;

    &__item {
      margin-bottom: 20px;
      padding: 0px 8px;
      //text-align:center;
      color: $charcoal;

      p {
        &:first-of-type {
          color: black;
          font-weight: 500;
        }
      }
    }
  }

  &__credentials {
    border-bottom: 1px solid rgba(211, 211, 211, 0.417);
    padding: 20px 0px;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    text-align: center;

    &__item {
      padding: 0px 8px;
      margin-bottom: 16px;
      color: $charcoal;
      text-align: center;
    }
  }

  &__cta {
    display: flex;
    justify-content: center;

    button {
      @include largebutton;
      max-width: 100%;
      width: 100%;
      font-size: 18px;
      height: auto;
      max-height: auto;
    }
  }
}
</style>