<template>
  <div class="settings">
    <!--<div class="settings__tabs">
            <template v-if="userContext === 'business'">
                <div v-for="tab in tabs" class="settings__tabs__tab" :class="[activeTab == tab ? 'active' : '']" :key="tab" @click="activateTab(tab)">{{tab}}</div>
            </template>
            <template v-else>
                <div v-for="tab in tabs.filter(t=> t!=='Team')" class="settings__tabs__tab" :class="[activeTab == tab ? 'active' : '']" :key="tab" @click="activateTab(tab)">{{tab}}</div>

            </template>
    </div>-->

    <SettingsTabs></SettingsTabs>

    <template>
      <Panel
        title="Tokens"
        execute_button_text="Reset"
        :disable_execute_button="tokens.updating"
        @onExecute="resetKeys"
      >
        <div class="integration">
          <div class="integration__container">
            <div class="integration__body">
              <div class="form-input">
                <span class="error"></span>
                <label for>Live Client Token</label>
                <input type="text" v-model="tokens.live_token" />
              </div>
              <div class="form-input">
                <span class="error"></span>
                <label for>Test Client Token</label>
                <input type="text" v-model="tokens.test_token" />
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </template>
  </div>
</template>

<script>
import EmptyState from "../../../components/states/EmptyState";
import LoadingState from "../../../components/states/LoadingState";
import Panel from "../../../components/general/Panel";

import moment from "moment";

export default {
  layout: "dashboard",
  components: {
    Panel,
    EmptyState,
    LoadingState
  },
  watch: {},
  data() {
    return {
      tokens: {
        live: "",
        test: "",
        updating: false
      }
    };
  },
  methods: {
    resetKeys() {
      this.tokens.updating = true;
      this.$api
        .post("/tokens")
        .then(resp => {
          this.$store.dispatch("dashboard/actionShowSuccessToast", {
            message: "Keys successfully regenerated"
          });
          this.tokens = resp.data.data;
        })
        .catch(e => {
          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: (e.response && e.response.data.data) || e
          });
        })
        .finally(() => {
          this.tokens.updating = false;
        });
    },
    getKeys() {
      this.$api
        .get("/tokens")
        .then(resp => {
          this.tokens = resp.data.data;
        })
        .catch(e => {
          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: (e.response && e.response.data.data) || e
          });
        });
    }
  },
  created() {
    this.getKeys();
    this.$store.commit("dashboard/setDashboardTitle", "Settings");
  }
};
</script>

<style lang="scss" scoped>
.remove {
  &--desktop {
    @include media("<=t") {
      display: none;
    }
  }
  &--mobile {
    display: none;
    @include media("<=t") {
      display: block;
    }
  }
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  width: 100%;
  height: 100%;

  @include media("<=t") {
    font-size: 15px;
  }
}
.flex {
  display: flex;
  @include media("<=t") {
    flex-direction: column;
  }
  &--between {
    justify-content: space-between;
    width: 100%;
  }
}
.bank-list {
  border-right: 1px solid rgba(211, 211, 211, 0.442);
  @include media("<=t") {
    //min-height: 200px;
  }
}
.bank-item {
  cursor: pointer;
  padding: 16px;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
  &:hover {
    background: rgba(211, 211, 211, 0.442);
  }
  span {
    font-size: 14px;
    color: $lightaccent;
    &:hover {
      background-color: lightgrey;
    }
  }
  p {
    font-weight: 400 !important;
    color: grey;
    font-size: 14px;
    &__name {
      font-size: 15px !important;
      color: black !important;
      font-weight: 500 !important;
    }
  }
  &__invitations {
    background: rgba(211, 211, 211, 0.442);
    padding: 16px;
    font-size: 14px;
    //margin-top: 8px;
    color: $lightaccent;
    &:hover {
      background-color: lightgrey;
    }
  }
}
.active {
  border-bottom: 2px solid $lightaccent !important;
  color: $lightaccent !important;
}
.settings {
  padding: 0 24px;
  background: white;
  margin-bottom: 50px;

  &__tabs {
    display: flex;
    margin-bottom: 16px;
    //justify-content: space-between;

    &__tab {
      padding: 16px;
      text-align: center;
      color: $charcoal;
      cursor: pointer;
    }
  }
}

.card,
.notifications {
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  width: 100%;
  background: white;
  padding: 16px;
  &--nopad {
    padding: 0 !important;
  }
  @include media("<=t") {
    margin-bottom: 10px;
    min-height: 200px;
  }
  &__header {
    font-size: 15px;
    color: grey;
    //border-bottom: 1px solid lightgrey;
    margin-bottom: 16px;
    font-weight: 500;
    //padding: 8px 0;
  }
}
.form-input {
  @include plain-form-input;
}
.integration {
  height: auto;
  background: white;
  width: 100%;
  &__container {
  }
  &__body {
    padding: 16px;
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: space-between;
  }
  &__header {
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
    padding: 16px;
    p {
      font-size: 16px;
      font-weight: 400;
      color: grey;
    }
  }
  &__button {
    @include smallbutton;
    width: auto;
    height: auto;
  }
}
</style>