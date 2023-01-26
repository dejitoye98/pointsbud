<template>
  <BaseModal @close="$emit('close', true)">
    <template #body>
      <div class="body" @click.stop>
        <div class="body__header">
          <p>Congratulations!</p>
        </div>
        <div class="body__caption">
          <p>You've joined campaign "{{campaign && campaign.title}}"</p>
          <p>You can now go to the campaign and get your exclusive shareable links.</p>
        </div>
        <div class="body__footer">
          <button @click="$emit('close', true)">Stay here</button>
          <button @click="goToCampaign">Go to Campaign</button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>


<script>
import Modal from "../Modal";
export default {
  name: "JoinedCampaignModal",
  props: ["campaign"],
  computed: {
    computedCampaign() {
      return this.campaign;
    }
  },
  components: {
    Modal
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    goToCampaign() {
      this.$router.push(`/dashboard/campaigns/${this.campaign.id}`);
    }
  },
  watch: {
    campaign(value) {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20vh;
  padding: 16px;

  &__header {
    font-size: 25px;
  }
  &__caption {
    padding: 8px 0;
    font-size: 15px;
    color: $charcoal;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    button {
      @include smallbutton;
      &:first-of-type {
        background: white;
        color: $charcoal;
      }
    }
  }
}
.footer {
  &__container {
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    button {
      @include smallbutton;
      &:first-of-type {
        background: white;
        margin-right: 8px;
        color: rgb(27, 31, 35);
      }
    }
  }
}
</style>