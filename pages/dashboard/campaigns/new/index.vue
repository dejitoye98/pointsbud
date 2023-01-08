<template>
  <div>
    <NewCampaign />
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import continents from "../../../../continents";
import countries from "../../../../countries";

import SelectCountriesInput from "../../../../components/inputs/SelectCountriesInput";
import NewCampaign from "../../../../components/NewCampaign";
import CurrencyMoneyInput from "../../../../components/inputs/CurrencyMoneyInput";
import FormCreator from "../../../../components/pagebuilder/FormCreator";

import Toast from "../../../../components/general/Toast";

import moment from "moment";
import SelectCountriesInputVue from "../../../../components/inputs/SelectCountriesInput.vue";
export default {
  layout: "dashboard-collapsed-sidebar",
  components: {
    DatePicker,
    SelectCountriesInput,
    CurrencyMoneyInput,
    Toast,
    NewCampaign,
    FormCreator
  },
  created() {
    this.$store.commit("dashboard/setDashboardTitle", "New Campaign");
  },
  data() {
    return {
      extraInfos: {
        budget: {
          text:
            "This is the amount of money you're committing to the campaign. Marketers get paid from this budget. When your budget is exhausted, your campaign is put on hold",
          visible: false
        },
        marketers_required: {
          text: "Default: unlimited",
          visible: false
        },
        who_can_join: {
          text:
            "Anyone: anyone on Afflee can join. Invited marketers: this campaign won't be publicly listed and will be only accessible to people you invite. Applicants: this allows you to screen interested marketers",
          visible: false
        },
        recurring_links: {
          text:
            "Default is 'NO'. 'YES' is best suited to publications/websites that create content regularly",
          visible: false
        },
        trying_to_create: {
          // text:`A form without`
        }
      },
      mode: "choice",
      step: 1,
      canCreateCampaign: false,
      selectedContinents: [],
      continents: continents,
      countries,
      success_message: "",
      errors: {
        title: "",
        description: "",
        budget: "",
        ends_at: "",
        who_can_join: "",
        application_questions: ""
      },
      link_errors: [""],
      can_continue: true,
      campaign: {
        title: "",
        description: "",
        budget: "",
        links_to_advertise: [{ link: "", pay_per_click: "", advert_note: "" }],
        join_by_invite: 0,
        payment_models: [],
        ends_at: "",
        thumbnail: "",
        countries_allowed: [],
        recurring_links: "",
        who_can_join: null,
        pay_currency: "NGN",
        conversion_media: [],
        application_questions: [""],
        categories: ["", ""]
      },
      template: {
        payment_models: ["Pay per click", "Pay per lead", "Pay per sale"]
      },
      loading: false
    };
  },
  computed: {},
  methods: {
    addConversionMedia(medium) {
      const index = this.campaign.conversion_media.find(a => a === medium);
      if (index) {
        this.campaign.conversion_media.splice(index, 1);
      } else {
        this.campaign.conversion_media.push(medium);
      }
    },
    previousStep() {
      if (this.mode === "click") {
        if (this.step > 1) {
          this.step--;
        } else {
          this.step = null;
          this.mode = "choice";
        }
      }
    },
    nextStep() {
      if (this.mode === "click") {
        let can_continue = true;
        if (this.step < 4) {
          if (this.step === 1) {
            const req_labels = ["title", "description", "budget"];

            for (let i = 0; i < req_labels.length; i++) {
              const key = req_labels[i];
              if (!this.campaign[key]) {
                this.errors[key] = `${key} cannot be empty`;
                //return;
                can_continue = false;
              } else {
                this.errors[key] = "";
              }
            }
          } else if (this.step === 2) {
            Object.keys(this.link_errors).forEach(key => {
              this.link_errors[key] = "";
            });
            this.campaign.links_to_advertise.forEach((link, index) => {
              if (!link.link || !link.pay_per_click || !link.advert_note) {
                this.$set(this.link_errors, index, "Please enter all fields");
                can_continue = false;
              } else if (
                !link.link.match(
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                )
              ) {
                this.$set(
                  this.link_errors,
                  index,
                  "Please provide a valid URL"
                );
                can_continue = false;
              } else if (link.pay_per_click < 0) {
                this.$set(
                  this.link_errors,
                  index,
                  "Cost cannot be less than 0"
                );
                can_continue = false;
              }
            });
          } else if (this.step === 3) {
            this.errors["who_can_join"] = "";
            if (!this.campaign.who_can_join) {
              can_continue = false;
              this.errors["who_can_join"] =
                "Please choose who can join this campaign";
            }
          } else if (this.step === 4) {
            this.errors["countries_allowed"] = "";
            if (!this.countries_allowed) {
              this.errors["countries_allowed"] = "Please choose countries";
            }
          }
          if (can_continue) {
            this.step++;
          }
        }
      } else if (this.mode === "sales-lead") {
        this.step++;
      }
    },
    setInfoVisibility(info) {
      if (this.extraInfos[info]) {
        this.extraInfos[info].visible = !this.extraInfos[info].visible;
      }
      //this.extraInfos[info].visibility = !this.
    },
    changeMode(mode) {
      this.mode = mode;
      this.step = 1;
    },
    addPaymentModel(model) {
      if (this.campaign.payment_models.find(a => a === a)) {
        // index
        const index = this.campaign.payment_models.indexOf(model);
        this.campaign.payment_models.splice(index, 1);
        return;
      }
      this.campaign.payment_models.push(model);
    },
    setCostPerClick(meta) {
      this.campaign.links_to_advertise[meta.index].pay_per_click = meta.value;
    },
    setCampaignBudget(value) {
      this.campaign.budget = value;
    },
    setCountriesAllowed(value) {
      this.campaign.countries_allowed = value;
    },
    addQuestion() {
      this.campaign.application_questions.push("");
    },
    removeQuestion(index) {
      this.campaign.application_questions.splice(index, 1);
    },
    checkCountry(country) {
      if (this.campaign.countries_allowed.includes(country)) {
        this.campaign.countries_allowed.splice(
          this.campaign.countries_allowed.indexOf(country),
          1
        );
      } else {
        if (!this.campaign.countries_allowed.includes(country)) {
          this.campaign.countries_allowed.push(country);
        }
      }
    },
    createCampaign() {
      this.validateSteps();

      if (this.can_continue) {
        this.campaign.recurring_links = this.campaign.recurring_links
          ? parseInt(this.campaign.recurring_links)
          : "";
        const payload = this.campaign;
        this.loading = true;
        this.$api
          .post("/campaigns", payload)
          .then(resp => {
            this.loading = false;
            this.$store.dispatch("dashboard/actionShowSuccessToast", {
              message: "Campaign was successfully created"
            });
          })
          .catch(err => {
            this.loading = false;
            const error = (err.response && err.response.data.data) || err;
            this.$store.dispatch("dashboard/actionShowErrorToast", {
              message: err
            });
          });
      } else {
        this.$store.dispatch("dashboard/actionShowErrorToast", {
          message: "Errors Exist. Please see form"
        });
      }
    },
    addThumbnail() {
      const input = document.getElementById("imagefile");
      const file = input.files && input.files[0];
      const vm = this;

      const cloudinary_url =
        "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
      try {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        const vm = this;

        xhr.open("POST", cloudinary_url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          }

          //const displayElement = document.createElement('img');
          //displayElement.src = response.secure_url
          //editor.append(displayElement)
          vm.campaign.thumbnail = response.secure_url;
        };

        fd.append("upload_preset", "jljh5lxc");
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", file);
        xhr.send(fd);
      } catch (e) {
        console.log(e);
      }
    },
    chooseContinent(continent) {
      //alert(continent)
      if (!this.selectedContinents.includes(continent)) {
        this.selectedContinents.push(continent);
        this.checkContinentCountries(continent);
      } else {
        const index = this.selectedContinents.indexOf(continent);
        this.selectedContinents.splice(index, 1);
        this.checkContinentCountries(continent, true);
      }
    },
    checkContinentCountries(continent, uncheck = false) {
      let countries_object = continents[continent];
      let countries = [];

      Object.keys(countries_object).forEach(country_code => {
        //countries.push(countries_object[country_code])
        let country = countries_object[country_code];

        if (uncheck) {
          if (this.campaign.countries_allowed.includes(country)) {
            this.campaign.countries_allowed.splice(
              this.campaign.countries_allowed.indexOf(country),
              1
            );
          }
        } else {
          if (!this.campaign.countries_allowed.includes(country)) {
            this.campaign.countries_allowed.push(country);
          }
        }
        if (document.getElementById("choice_" + country_code)) {
          document.getElementById("choice_" + country_code).checked =
            uncheck === false ? true : false;
        }
      });

      /* countries.forEach(country => {
                country = country.toLowerCase();
                
            })*/
    },

    removeLink(index) {
      this.campaign.links_to_advertise.splice(index, 1);
      this.link_errors.splice(index, 1);
    },

    addLink() {
      this.campaign.links_to_advertise.push({
        link: "",
        pay_per_click: "",
        advert_note: ""
      });
      this.link_errors.push("");
    },
    validateSteps() {
      // clear errors first =

      Object.keys(this.errors).forEach(key => {
        this.errors[key] = "";
      });

      Object.keys(this.link_errors).forEach(key => {
        this.link_errors[key] = "";
      });

      this.can_continue = true;

      const fields = {
        1: ["title", "description", "budget", "ends_at"]
      };
      for (let i = 0; i < fields[1].length; i++) {
        const key = fields[1][i];
        if (!this.campaign[key]) {
          this.errors[key] = `${key} cannot be empty`;
          this.can_continue = false;
        } else {
          this.errors[key] = "";
        }
      }

      this.validateStep2();

      this.validateStep3();
    },

    validateStep2() {
      let can_continue = true;
      this.campaign.links_to_advertise.forEach((link, index) => {
        if (!link.link || !link.pay_per_click || !link.advert_note) {
          //alert(link)
          this.$set(this.link_errors, index, "Please enter all fields");
          //this.link_errors[index] =  "Please enter all fields for all links"
          //if (!this.link_errors[index]) this.link_errors[index] = ""
          //this.link_errors[index] =   "Please enter all fields"
          this.can_continue = false;
        } else if (
          !link.link.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          )
        ) {
          this.$set(this.link_errors, index, "Please provide a valid URL");
        } else if (link.pay_per_click < 0) {
          this.$set(this.link_errors, index, "Cost cannot be less than 0");
        }
      });

      return can_continue;
    },
    validateStep3() {
      // privacy;
      // sanitize

      if (!this.campaign.who_can_join) {
        this.errors.who_can_join = "Please select who can join";
        this.can_continue = false;
        return;
      }
      if (
        this.campaign.who_can_join !== 2 &&
        this.campaign.who_can_join !== "2"
      ) {
        this.campaign.application_questions = [""];
        return true;
      } else if (this.campaign.application_questions[0] === "") {
        this.errors.application_questions =
          "Please enter at least one question to ask applicatnts";
        this.can_continue = false;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.plain-button {
  background: transparent !important;
  color: $lightaccent !important;
  margin-right: 8px !important;
  border: 0 !important;
}
.tabs {
  display: flex;
  //background: white;
  flex-wrap: wrap;
  justify-content: space-between;

  &__tab {
    background: white;
    border: 1px solid rgb(236, 231, 231);
    border-right: 0;
    padding: 6px;
    cursor: pointer;
    letter-spacing: 0.25px;
    width: 25%;
    &:last-of-type {
      border-right: 1px solid rgb(236, 231, 231);
    }

    p {
      color: grey;
      font-size: 14px;
    }
    &--selected {
      background: $primary;
      border: 1px solid $primary;
      p {
        color: white;
      }
    }
    &--passed {
      background: $lightaccent;
      border: 1px solid $lightaccent;

      p {
        color: white !important;
      }
    }
  }
}
.choice {
  width: 100%;
  &__container {
    width: 100%;
    margin: auto;
    @include media("<=t") {
      width: 90%;
    }
  }
  &__header {
    p {
      font-size: 36px;
      font-weight: 500;
    }
  }
  &__body {
    display: flex;
    width: 100%;

    @include media("<=t") {
      flex-direction: column;
    }
  }
  &__item {
    background: white;
    padding: 16px;
    cursor: pointer;
    margin-right: 8px;
    border-radius: 2px;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48%;
    border-radius: 10px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transform: translateY(-2px);
    }
    p {
      font-size: 18px;
      font-weight: 400;
    }
  }
}

.new {
  width: 100%;
  //margin: auto;
  padding: 50px 16px;

  &__cta {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      @include largebutton;
      min-height: auto;
      min-width: auto;
      width: 200px;
    }
  }
}

.section {
  padding: 24px 0px;

  &__body {
    margin-bottom: 24px;
    font-size: 30px;
  }
}
/*
.section {
    box-shadow: rgba(0, 0, 0, 0.25) 0 1px 1px;
    background: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    margin-bottom: 40px;

    &__header {
        
        //background:  #e3a09e6a;
        background: #fafafa;
        //border-top: 2px solid  #857c7c2c;;
        border-bottom: 2px solid  #857c7c2c;;

        color: black;
        font-size: 16px; 
        padding: 16px 0;
        font-weight: 500;   

        p {
            width: 95%;
            margin: auto;
            display: block;
        }
    }

    &__body {
        &__container {
            padding: 16px 0;
            width: 95%;
            margin: auto;
        }
    }

}*/

.flex-row {
  display: flex;
  flex-wrap: wrap;
}

.bold-label {
  font-weight: 600;
}

.checkbox-label {
  display: flex;
  align-items: center;
  margin-right: 16px;
  position: relative;
  border-radius: 10px;
  padding: 4px 8px;
  font-weight: 300 !important;
  background: white;
  //border: 1.5px solid rgba(169, 169, 169, 0.64);
  //border: 1.5px solid #ced4da58 !important;
  border: 1px solid rgba(169, 169, 169, 0.64) !important;

  margin-bottom: 5px;

  input {
    margin-right: 8px;
    min-height: 25px !important;
    appearance: auto !important;
  }
}
.step-active {
  .circle {
    background: $lightaccent;
    border: $lightaccent;
  }
  p {
    color: $lightaccent !important;
  }
}
.half {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: height 2s ease-in;
  .form-input {
    width: 48%;

    &:deep(div) {
      width: 100%;
      min-height: 40px;
    }
  }
}
.circle {
  background: white;
  border: 1px solid lightgrey;
  height: 10px;
  width: 10px;
  border-radius: 50%;

  &--filled {
    background: lightgrey;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-size: 14px;
  }
  @include media("<=t") {
    font-size: 12px;
  }
}

.red {
  color: red !important;
  cursor: hi;
}

.add-link {
  padding: 16px 0px;
  color: $primary;
  font-size: 14px;
  cursor: pointer;
  //text-decoration: underline;
  border: 1px dotted grey;
}

.error {
  color: red;
  font-size: 14px;
}

.question {
  //width: 20px;
  //height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: grey 1px solid 2px solid !important;
  color: grey !important ;
}
.form-group {
  display: flex;
  flex-direction: column;
  background: white;
  border: rgba(211, 211, 211, 0.263) 1px solid;
  border-radius: 2px;
  padding: 16px 16px;
  &--row {
    padding: 0;
    border: none;
    flex-direction: row;
    justify-content: space-between;

    .form-input {
      width: 45%;
    }
  }
}
.form-input {
  @include plain-form-input;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &__info {
    color: grey;
    font-size: 13px;
  }

  label {
    font-size: 15px;
    //color: $faint;
    color: grey;

    display: flex;
    font-weight: 500;
    align-items: center;
    letter-spacing: 0.25px;
    //border: 1px solid lightgrey;

    .divider {
      width: 2px;
      height: 2px;
      background: grey;
      border-radius: 50%;
      margin: 0 5px;
    }

    .info {
      appearance: none;
      margin-right: 2px;
      cursor: pointer;
      color: grey;
      text-decoration: underline;
      cursor: pointer;
      display: flex;
      padding: 0 8px;
      font-size: 13px;
      //background: white;
      //border: 1px solid lightgrey;
      border-radius: 5px;
    }
    .red {
      margin-left: 2px;
    }
  }
  input,
  textarea,
  :deep(input) {
    border: 0.5px solid rgba(169, 169, 169, 0.64) !important;
    min-height: 40px;
    border-radius: 5px;
    padding: 8px;
    outline: none;
    font-weight: 300;
    letter-spacing: 0.5px;
    font-size: 15px;
    // color: $faint;
    color: black;
    appearance: none;
    background-color: rgba(211, 211, 211, 0.046);
    background: white;
    &:focus {
      outline: $primary;
    }
  }
}
.advert-link {
  margin-bottom: 8px;
  &-head {
    display: flex;
    justify-content: flex-end;
    span {
      color: $lightaccent;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.form-group {
  margin-bottom: 16px;
}
.advert-link-row {
  div {
    width: 20%;
    &:first-of-type {
      width: 79% !important;
    }
  }
}
.form-section-title {
  padding: 20px 0 10px;
  font-weight: 600;
  font-size: 14px;
  color: $primary;
  text-transform: uppercase;
}

.cta {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .back {
    p {
      font-weight: 500;
      color: $faint;
      cursor: pointer;
    }
  }
  button {
    @include largebutton;
    height: 40px;
    padding: 8px 16px;
    width: auto;
    margin-left: 16px;
  }
}
</style>