<template>
  <div>
    <div class="side desktop" :class="[collapsed ? 'collapsed' : '']">
      <div class="side__container">
        <div class="side__header" :class="[collapsed ? 'side__header--collapsed': '']">
          <div
            class="side__header__container"
            :class="[collapsed ? 'side__header__container--collapsed': '']"
          >
            <img class="logo" src="../static/logo.svg" alt v-if="!collapsed" />
            <img class="collapsed-logo" src="../static/collapsed-logo.svg" alt v-else />
          </div>
        </div>

        <div class="side__body">
          <sidebar-item :collapsed="collapsed" :text="'Overview'" link="/overview" />
          <sidebar-item :collapsed="collapsed" :text="'Campaigns'" link="/campaigns" />
          <sidebar-item
            :collapsed="collapsed"
            v-if="context === 'marketer'"
            :text="'Earnings'"
            link="/earnings"
          />
          <sidebar-item :collapsed="collapsed" :text="'Wallet'" link="/wallet" />
          <sidebar-item :collapsed="collapsed" :text="'Settings'" link="/settings" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["context", "collapsed"],
  data() {
    return {
      // active: 'Overview'
    };
  },
  methods: {
    setActive(name) {
      this.active = name;
    }
  }
};
</script>
<style lang="scss" scoped>
.desktop {
  display: none !important;
  @include media(">=dashbreak") {
    display: flex !important;
  }
}
.collapsed {
  max-width: 65px;
}
.side {
  //box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
  //rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  box-shadow: rgba(0, 0, 0, 0.027) 1.95px 1.95px 2.6px;
  position: fixed;
  height: 100%;
  width: 200px;
  background: white;
  z-index: 20;

  @include media("<=t") {
    display: none;
  }
  &__container {
    //width: 80%;
    //margin: auto;
    padding: 36px 0;
  }

  &__header {
    margin-bottom: 40px;
    padding: 0 36px;

    &__container {
      width: 100px;

      &--collapsed {
        width: auto;
      }
    }

    img {
      object-fit: contain;
      height: auto;
      margin: auto;
      margin-bottom: 50px;
      width: 100%;
      margin: 0;
    }
  }
}
</style>