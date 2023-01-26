<template>
  <div>
    <BaseModal @close="$emit('close', true)">
      <template #body>
        <div class="content" style="position relative" @click.stop>
          <div class="mask" v-show="show_copied">Copied to clipboard!</div>
          <div class="form-field">
            <div class="form-input">
              <label for>Advert Note</label>
              <textarea v-if="advert_note" :value="advert_note + ' ' + link " disabled></textarea>
              <textarea v-else :value="link " disabled></textarea>
            </div>

            <svg
              @click="copyLink('advert_note')"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="form-field">
            <div class="form-input">
              <label for>Link</label>
              <input disabled type="text" :value="link" />
            </div>

            <svg
              @click="copyLink('link')"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
export default {
  props: ["advert_note", "link"],
  watch: {
    show_copied(value) {
      if (value === true) {
        this.timeout = setTimeout(() => {
          this.show_copied = false;
        }, 1000);

        //clearTimeout(this.timeout)
      }
    }
  },
  data() {
    return {
      timeout: {},
      show_copied: false
    };
  },

  methods: {
    copyLink(type) {
      let text;
      if (type === "advert_note") {
        text = this.advert_note;
      } else {
        text = this.link;
      }
      navigator.clipboard.writeText(text);
      this.show_copied = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 16px;
  position: relative;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.726);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
}
.form-field {
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
}
.form-input {
  @include plain-form-input;
  input {
    color: $primary;
  }
  label {
    color: $charcoal;
  }

  width: 95%;
}

.modal {
  &__footer {
    display: grid;
    grid-template-columns: 29% 29% 29%;
    &__item {
      cursor: pointer;
      color: $charcoal;

      &:hover {
        background: $dashboard-background-color;
      }
    }
  }
}
</style>