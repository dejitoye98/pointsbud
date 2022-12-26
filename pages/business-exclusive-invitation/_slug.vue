<template>
  <div class="iv" v-if="details && Object.keys(details).length > 1">
    <div class="iv__header">
      <div class="logos">
        <img class="logo logo--afflee" src="../../logo.svg" alt="afflee-logo" />
        <svg
          width="352"
          height="431"
          viewBox="0 0 352 431"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 10L342 421" stroke="#4B4B4B" stroke-width="20" stroke-linecap="round" />
          <path d="M10.5 417L342 11.5" stroke="#4B4B4B" stroke-width="20" stroke-linecap="round" />
        </svg>
        <img class="logo logo--company ifitness" :src="details.logo" alt />
      </div>

      <div class="business"></div>

      <div class="iv__header__content">
        <h1>Hey, {{details.name}}</h1>
        <p>
          Let social media content creators and influencers bring you more
          <span
            class="bold"
          >{{details.intent}}</span> and pay them a commission for ONLY the results they bring.
        </p>
      </div>
      <div class="iv__header__cta">
        <button class="largebutton" @click="scrollToHow">Learn how it works</button>
      </div>
    </div>

    <div class="body" id="body" v-if="scroll_to_how">
      <div class="section">
        <div class="section__header">
          <p>How it works</p>
        </div>
        <div class="section__content">
          <div class="section__content__left">
            <div class="section__content__right mobile-show">
              <img
                src="../../product-dashboard-2.png"
                alt
                @click="registerEvent('Clicked on product image - mobile')"
              />
            </div>
            <p>
              Using Afflee, you can get more sales via social media by digitizing marketing campaigns and gaining access to
              <span
                class="bold"
              >{{details.type_of_influencers}}</span> and content creators who will push your campaigns for a commission.
            </p>
            <p>Afflee lets you automatically pay each marketer for only generated sales or website visits (whichever matters to you).</p>
            <p class>We provide you with everything you need, including:</p>
            <div class="list">
              <ul>
                <li>Statistical insights to see how well your campaign is faring and the performance of your marketers.</li>
                <li>Hosted order forms and integrated payments to collect information about and payment from your new customers.</li>
                <li>End-to-end workflows that can be used to onboard new customers.</li>
              </ul>
            </div>
          </div>

          <div class="section__content__right desktop-show">
            <img
              src="../../product-dashboard-2.png"
              @click="registerEvent('Clicked on product image - desktop')"
              alt
            />
          </div>
        </div>
      </div>
      <div class="section diff-back">
        <div class="section__header">
          <p style="text-align:center">GET EARLY ACCESS</p>
        </div>
        <div class="section__content">
          <div class="section__content__left">
            <!--<p>We are a performance marketing platform backed by <a href="https://flutterwave.com"> Flutterwave </a> with early partners including <a href="https://theboroughlagos.com/restaurant/">Circa Lagos</a>, <a href="https://healthtracka.com">HealthTracka</a> and a number of businesses accross different industries</p>-->
            <p>
              We are a performance marketing platform backed by
              <a
                href="https://flutterwave.com"
              >Flutterwave</a> with early partners in businesses accross different industries
            </p>
            <p>
              We are
              <span class="bold">14 days</span> away from launch and have garnered interest from some of the biggest influencers (including Fitness Influencers) in Nigeria.
            </p>

            <div class="influencers">
              <img
                @click="registerEvent('Clicked on image Josh')"
                src="data:image/jpeg;base64,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"
                alt
              />
              <img
                @click="registerEvent('Clicked on image Sophy')"
                src="https://i0.wp.com/1.bp.blogspot.com/-BF5DJdB4Wp0/YMdU_CEP54I/AAAAAAAAX5w/shXh_VeCXr8IhLoyG7O66l1VNYdF7iP4gCLcBGAsYHQ/s1343/478fc94063adc60e6e58946afd0590c6.jpg?ssl=1"
              />
              <img
                @click="registerEvent('Clicked on image Rinu')"
                src="https://naijabiography.com/wp-content/uploads/2022/06/savvyrinu_275393212_268769112086279_4945221620327256294_n.jpg"
                alt
              />
              <img
                @click="registerEvent('Clicked on image Ero')"
                src="https://guardian.ng/wp-content/uploads/2022/06/Eronini-Osinachim.jpg"
                alt
              />
              <img
                @click="registerEvent('Clicked on image Maliya')"
                src="https://1.bp.blogspot.com/-51TMicbbKxI/XziE_dNy7mI/AAAAAAAAPrQ/szvfP2hnwhAy8y6tZt1K4pZ427zfNP8nACLcBGAsYHQ/s1600/PhotoGrid_1597539549371.jpg"
                alt
              />
            </div>
            <p>Get access to our Tier-1 influencers by filling out the form</p>
          </div>

          <div class="section__content__right">
            <div class="form">
              <div class="form__header">
                <p>Join the waitlist</p>
              </div>
              <template v-if="registered">
                <p
                  style="color: lightseagreen; margin-bottom:20px; text-align:center"
                >Thank you for choosing to join Afflee. We will reach out to you with your verified account immediately we launch</p>
              </template>
              <template v-if="!registered">
                <div class="form-input" v-if="!registered">
                  <label for>
                    Your Name
                    <span class="red">*</span>
                  </label>
                  <input v-model="business.user_name" type="text" />
                </div>
                <div class="form-input" v-if="!registered">
                  <label for>
                    Business Name
                    <span class="red">*</span>
                  </label>
                  <input v-model="business.name" type="text" />
                </div>
                <div class="form-input" v-if="!registered">
                  <label for>
                    Email Address
                    <span class="red">*</span>
                  </label>
                  <input v-model="business.email" type="text" />
                </div>
                <div class="form-input">
                  <label for>
                    Phone Number
                    <span class="red">*</span>
                  </label>
                  <input v-model="business.phone" type="text" />
                  <!--<span>We will never share your mobile number without your permission</span>-->
                </div>

                <div class="flex-row">
                  <p class="label-head">Are you launching a marketing campaign sometime soon?</p>
                  <label class="radio-label">
                    <input v-model="business.campaign_soon" type="radio" value="yes" />
                    <div class="radio-indicator"></div>
                    <div class="radio-text">Yes</div>
                  </label>
                  <label class="radio-label">
                    <input v-model="business.campaign_soon" type="radio" value="no" />
                    <div class="radio-indicator"></div>
                    <div class="radio-text">No</div>
                  </label>
                </div>
              </template>
              <button
                v-if="!registered"
                :disabled="registering"
                class="largebutton"
                @click="registerEvent('Clicked on Get Early Access'); register()"
              >Get Early Access</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Ⓒ 2022 Afflee Inc. All rights served</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll_to_how: false,
      business: {
        name: "",
        user_name: "",
        email: "",
        phone: "",
        campaign_soon: ""
      },
      details: {},
      registering: false,
      registered: false
    };
  },
  created() {
    this.fetchIv();
    this.opened();
  },
  methods: {
    opened() {
      this.$api.post(
        "https://stagingaffleebackend.herokuapp.com/api/v1/exclusive/business/" +
          this.$route.params.slug +
          "/opened"
      );
    },
    register() {
      this.registering = true;
      this.$api
        .post(
          "https://stagingaffleebackend.herokuapp.com/api/v1/exclusive/business/" +
            this.$route.params.slug +
            "/register",
          this.business
        )
        .then(resp => {
          this.registering = false;
          this.registered = true;
        })
        .catch(err => {
          this.registering = false;
        });
    },
    registerEvent(name) {
      this.$api.post(
        "https://stagingaffleebackend.herokuapp.com/api/v1/exclusive/business/" +
          this.$route.params.slug +
          "/events",
        {
          name,
          timestamp: Date.now()
        }
      );
    },
    fetchIv() {
      this.$api
        .$get(
          "https://stagingaffleebackend.herokuapp.com/api/v1/exclusive/business/" +
            this.$route.params.slug
        )
        .then(resp => {
          this.details = resp.data;
          //this.addedToWaitList = true;
        })
        .catch(err => {
          // alert(err)
          console.log(err);
        });
    },
    scrollToHow() {
      this.scroll_to_how = true;
      this.registerEvent("Clicked on 'Learn How It Works");
      setTimeout(() => {
        document.querySelector("#body").scrollIntoView({
          behavior: "smooth"
        });
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
$charcoal: #36454f;
$primary: #de5c6e;

$break: 740px;
* {
  font-family: "Quicksand", sans-serif;
}

.desktop-show {
  @media screen and (max-width: $break) {
    display: none;
  }
}
.mobile-show {
  display: none;
  @media screen and (max-width: $break) {
    display: block;
    margin-bottom: 16px;
  }
}

a {
  color: #de5c6e;
}

.influencers {
  display: flex;
  margin-bottom: 16px;
  flex-wrap: wrap;

  img {
    margin-right: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid lightgrey;
    margin-bottom: 10px;
  }
}
.diff-back {
  padding: 64px !important;
  background: rgba(128, 128, 128, 0.059);
  @media screen and (max-width: $break) {
    padding: 16px !important;
  }
}
.red {
  color: red;
}

.form {
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.197);
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);

  padding: 20px;

  &__header {
    margin-bottom: 8px;
    text-align: center;
    font-size: 20px;
    width: 50%;
    margin: auto;
    margin-bottom: 10px;
  }
}
.form-input {
  background: rgba(211, 211, 211, 0.247);
  border-radius: 5px;
  min-height: 55px;
  outline: none;
  margin-bottom: 24px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  @media screen and (max-width: 789px) {
    margin-bottom: 16px;
  }
  &--marginOverrule {
    margin-bottom: 0;
  }
  &--half {
    //width: 48%;
  }
  label {
    font-size: 12px;
    color: grey;
    font-weight: 600;
    position: absolute;
    top: 0;
    left: 10px;
    right: 10px;
    top: 10px;
  }
  input,
  select,
  textarea {
    height: 100%;
    width: 100%;
    background: transparent;
    outline: none;
    position: absolute;
    top: 0px;
    padding-top: 12px;
    padding-left: 10px;
    padding-right: 10px;
    color: rgba(0, 0, 0, 0.726);
    appearance: none;
    font-size: 15px;
    &:focus {
      outline: 2px solid #e3a09e;
    }
  }
  &--textarea {
    height: 200px;
    textarea {
      padding-top: 25px;
      height: 200px !important;
      resize: none;
    }
  }
  option {
    padding-left: 0px !important;
  }
}

.list {
  margin-left: 24px;
  @media screen and (max-width: $break) {
    margin-left: 16px;
  }
  ul {
    list-style-type: disc;
    li {
      color: $charcoal;
      margin-bottom: 16px;
      @media screen and (max-width: $break) {
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
}
.section {
  width: 90%;
  margin: auto;
  padding: 64px 16px;
  margin-bottom: 120px;
  @media screen and (max-width: $break) {
    margin-bottom: 60px;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &__header {
    p {
      //text-align: center;
      margin-bottom: 36px;
      color: #de5c6e;
      font-size: 30px;
      font-weight: 500;
      text-transform: uppercase;

      @media screen and (max-width: $break) {
        font-size: 25px;
        margin-bottom: 15px;
      }
    }
  }
  &__content {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: $break) {
      flex-direction: column;
    }

    &__left {
      width: 45%;
      @media screen and (max-width: $break) {
        width: 100%;
      }
      p {
        margin-bottom: 32px;
        font-size: 18px;
        color: #36454f;
        font-weight: 400;
        @media screen and (max-width: $break) {
          font-weight: 400;
          font-size: 16px;
        }
      }
    }

    &__right {
      width: 45%;
      @media screen and (max-width: $break) {
        width: 100%;
      }
      img {
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);

        border: 0.5px solid rgba(128, 128, 128, 0.1);
      }
    }
  }
}
.bold {
  font-weight: 500;
  text-decoration: underline;
}
.label-head {
  font-size: 12px;
  color: grey;
}
.flex-row {
  position: relative;
  //margin-top: 40px;
  margin-bottom: 30px;
}

.radio-label {
  position: relative;

  display: flex;
  padding: 8px 8px;
  align-items: center;
  border: 1px solid #d6d6e7;
  border-radius: 3px;
  margin-right: 8px;
  box-shadow: inset 0 1px 4px 0 rgb(227 160 158 / 20%);
  transition: all 100ms ease-in-out;
  height: 50px;
  background: rgba(211, 211, 211, 0.247) !important;

  //background: none !important;

  //border: 1px solid grey;

  &:hover {
    background: rgba(211, 211, 211, 0.382);
  }
  &:focus-within {
    //background: lightgray;
  }
  input {
    cursor: pointer;
    border: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(211, 211, 211, 0.247) !important;
  }

  .radio-indicator {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    border-radius: 50%;
    background: lightgrey;
    display: block;
  }
  .radio-text {
    font-size: 14px;
    font-weight: 400;
  }

  input:checked + .radio-indicator {
    background: $primary;
  }
}
.body {
  background: #9ab2b611;
  padding-bottom: 120px;
}

.largebutton {
  background: #de5c6e;
  border: 2px solid #de5c6e;
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
  margin-bottom: 8px;
  @media screen and (max-width: $break) {
    margin-bottom: 16px;
    min-height: 40px;
    font-size: 18px !important;
    padding: 8px 12px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
  &:disabled {
    background: lightgrey;
    border: 2px solid lightgrey;
    box-shadow: none;
  }
}
.iv {
  &__header {
    padding-bottom: 50px;
    background: #9ab2b611;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__content {
      //width: 80%;
      //margin: auto;
      //text-align: center;
      background-color: transparent;
      margin-top: 50px;
      padding: 0px 50px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media screen and (max-width: $break) {
        margin-top: 10px;
        padding: 0px 20px;
      }

      h1 {
        font-size: 50px;
        @media screen and (max-width: $break) {
          font-size: 30px;
        }
      }
      p {
        font-size: 25px;
        font-weight: 300;
        max-width: 50%;
        margin: auto;
        margin-top: 16px;
        @media screen and (max-width: $break) {
          font-size: 18px;
          max-width: 80%;
          line-height: 30px;
        }
      }
    }
    &__cta {
      display: flex;
      justify-content: center;
      margin-bottom: 50px;
      margin-top: 50px;
    }

    button {
      width: 50%;
      margin: auto;
      font-size: 25px;
      font-weight: 300;
    }
  }
}
.logos {
  //margin: auto;
  display: flex;
  //width: 100%;
  // padding-top: 50px;
  height: 200px;
  // padding-bottom: 50px;
  align-items: center;
  //border: 1px solid grey;
  text-align: center;
  justify-content: center;
  margin-top: 0;

  svg {
    width: 20px;
    margin: 0 20px;
  }
}

.logo {
  //border: 1px solid grey;
  width: 10%;
  @media screen and (max-width: $break) {
    width: 20%;
  }
}

.footer {
  background-color: #de5c6e;
  text-align: center;
  color: white;
  padding: 120px 0;
}
</style>