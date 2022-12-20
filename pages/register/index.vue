<template>
  <div class="page">
    <div class="header">
      <div class="header__container">
        <div class="logo" @click="goHome">
          <Logo />
        </div>

        <div class="header__steps header__steps--desktop">
          <div
            class="header__steps__item"
            :class="[step === 1 || step > 1 || step === 'finish'? 'step-active': '']"
            @click="changeStep(1)"
          >
            <div class="circle circle--filled">1</div>
            <p>Who are you</p>
          </div>
          <div class="header__steps__divider"></div>

          <div
            v-if="mode === 1"
            class="header__steps__item"
            :class="[mode === 1 && (step === 2 || step > 2 || step === 'finish')? 'step-active': '']"
            @click="changeStep(2)"
          >
            <div class="circle circle--filled">2</div>
            <p>About you</p>
          </div>
          <div v-if="mode === 1" class="header__steps__divider"></div>

          <div
            v-if="mode === 2"
            class="header__steps__item"
            :class="[mode === 2 && (step === 2 || step > 2 || step === 'finish')? 'step-active': '']"
            @click="changeStep(2)"
          >
            <div class="circle circle--filled">2</div>
            <p>Personal Information</p>
          </div>
          <div v-if="mode === 2" class="header__steps__divider"></div>

          <div
            v-if="mode === 2"
            class="header__steps__item"
            :class="[mode === 2 && (step === 3 || step > 3 || step === 'finish')? 'step-active': '']"
            @click="changeStep(2)"
          >
            <div class="circle circle--filled">3</div>
            <p>Other Information</p>
          </div>
          <div v-if="mode === 2" class="header__steps__divider"></div>

          <div class="header__steps__item" :class="[step === 'finish'? 'step-active': '']">
            <div class="circle circle--filled" v-if="mode === 1">3</div>
            <div class="circle circle--filled" v-else>4</div>
            <p>Finish</p>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="body__container">
        <div class="step step1" v-if="step === 1">
          <p class="step1__header">Who are you?</p>
          <div class="step1__choice">
            <div
              class="step1__choice__item"
              :class="[mode === 1 ? 'step1__selected': '']"
              @click="selectMode(1)"
            >
              <!--<div class="step1__choice__item__illustration">
                                <img src="../../static/cooperation.png" alt="">
              </div>-->
              <div style="width:100%">
                <div
                  class="step1__choice__item__header"
                  style="display: flex; justify-content: space-between; align-items:center;"
                >
                  <p>I am a business</p>
                  <div class="circle"></div>
                </div>
                <p>I want to market my brand and products</p>
              </div>
            </div>
            <div
              class="step1__choice__item"
              :class="[mode === 2 ? 'step1__selected': '']"
              @click="selectMode(2)"
            >
              <div style="width:100%">
                <div
                  class="step1__choice__item__header"
                  style="display: flex; justify-content: space-between; align-items:center"
                >
                  <p>I am a marketer</p>
                  <div class="circle"></div>
                </div>
                <p>I want to earn money by marketing brands and products</p>
              </div>
            </div>
          </div>

          <div class="step1__button">
            <button :disabled="!mode" @click="changeStep(2)">Continue</button>
          </div>

          <span class="already">
            Already have an account?
            <a :href="pageIntent ? `/login?${pageIntent}` : '/login'">Login</a>
          </span>
        </div>

        <div class="step2" v-else-if="step === 2 && mode === 1">
          <span class="error">{{error}}</span>
          <div class="step2__item form-item">
            <div class="left">
              <p>Business Information</p>
              <p>Provide your business info.</p>
            </div>

            <div class="right">
              <span class="error">{{errors.name}}</span>
              <div class="form-input">
                <label for>
                  Business Name
                  <span class="required">*</span>
                </label>
                <input type="text" v-model="business.name" />
              </div>

              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.industry}}</span>
                  <div class="form-input">
                    <label for>
                      Industry
                      <span class="required">*</span>
                    </label>

                    <select type="text" v-model="business.industry">
                      <option
                        :value="industry"
                        v-for="industry in industries"
                        :key="industry"
                      >{{industry}}</option>
                    </select>
                  </div>
                </div>
                <div class="half">
                  <span class="error">{{errors.country}}</span>
                  <div class="form-input">
                    <label for>
                      Country
                      <span class="required">*</span>
                    </label>

                    <select type="text" v-model="business.country">
                      <option
                        :value="country.name"
                        v-for="country in computedCountries"
                        :key="country.name"
                      >{{country.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-input-file">
                <div class="file-container">
                  <label id="display-picture-label">Upload Logo</label>
                  <input @change="uploadLogo" type="file" id="display-picture" accept="image/*" />
                </div>
              </div>
            </div>
          </div>
          <div class="step2__item form-item">
            <div class="left">
              <p>Personal Information</p>
              <p>Provide your personal info.</p>
            </div>

            <div class="right">
              <div class="flex-col">
                <span class="error">{{errors.user_name}}</span>
                <div class="form-input">
                  <label for>
                    Your Name
                    <span class="required">*</span>
                  </label>
                  <input v-model="business.user_name" type />
                </div>
              </div>

              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.email}}</span>
                  <div class="form-input form-input--half">
                    <label for>
                      Email Address
                      <span class="required">*</span>
                    </label>
                    <input v-model="business.email" type="text" />
                  </div>
                </div>

                <div class="half">
                  <span class="error">{{errors.phone}}</span>

                  <div class="form-input">
                    <VuePhoneNumberInput default-country-code="NG" v-model="business.phone_number" />
                    <!--<label for="">Phone Number</label>-->
                    <!--<input v-model="business.phone_number" type="text">-->
                  </div>
                </div>
              </div>
              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.password}}</span>
                  <div class="form-input">
                    <label for>
                      Password
                      <span class="required">*</span>
                    </label>
                    <input v-model="business.password" type="password" />
                  </div>
                </div>

                <div class="half">
                  <span class="error">{{errors.confirm_password}}</span>

                  <div class="form-input">
                    <label for>
                      Confirm Password
                      <span class="required">*</span>
                    </label>
                    <input v-model="business.confirm_password" type="password" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step2__button">
            <button @click="register">Sign Up</button>
          </div>
        </div>

        <div class="step2" v-else-if="step === 2 && mode === 2">
          <span class="error">{{error}}</span>

          <div class="step2__item form-item">
            <div class="left">
              <p>Personal Information</p>
              <p>Provide your personal info.</p>
            </div>

            <div class="right">
              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.name}}</span>
                  <div class="form-input">
                    <label for>
                      Your Name
                      <span class="required">*</span>
                    </label>
                    <input v-model="marketer.name" type />
                  </div>
                </div>
                <div class="half">
                  <span class="error">{{errors.email}}</span>
                  <div class="form-input form-input--half">
                    <label for>
                      Email Address
                      <span class="required">*</span>
                    </label>
                    <input v-model="marketer.email" type="text" />
                  </div>
                </div>
              </div>

              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.phone}}</span>

                  <div class="form-input">
                    <VuePhoneNumberInput default-country-code="NG" v-model="marketer.phone_number" />
                    <!--<label for="">Phone Number</label>-->
                    <!--<input v-model="business.phone_number" type="text">-->
                  </div>
                </div>

                <div class="half">
                  <span class="error">{{errors.country}}</span>
                  <div class="form-input">
                    <label for>
                      Country
                      <span class="required">*</span>
                    </label>

                    <select type="text" v-model="marketer.country">
                      <option
                        :value="country.name"
                        v-for="country in computedCountries"
                        :key="country.name"
                      >{{country.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex-row">
                <div class="half">
                  <span class="error">{{errors.password}}</span>
                  <div class="form-input">
                    <label for>
                      Password
                      <span class="required">*</span>
                    </label>
                    <input v-model="marketer.password" type="password" />
                  </div>
                </div>

                <div class="half">
                  <span class="error">{{errors.confirm_password}}</span>

                  <div class="form-input">
                    <label for>
                      Confirm Password
                      <span class="required">*</span>
                    </label>
                    <input v-model="marketer.confirm_password" type="password" />
                  </div>
                </div>
              </div>

              <div class="flex-col">
                <div class="form-input form-input--textarea">
                  <label for>Bio (optional)</label>
                  <textarea type="text" v-model="marketer.bio"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="step2__button">
            <button
              @click="register"
              v-if="(mode === 1 && step ===2) || (mode === 2 && step === 3)"
            >Sign Up</button>
            <button @click="changeStep(3)" v-else>Continue</button>
          </div>
        </div>
        <div class="step2" v-else-if="step === 3 && mode === 2">
          <span class="error">{{error}}</span>

          <div class="step2__item form-item">
            <div class="left">
              <p>Professional Information</p>
              <p>Provide your business info.</p>
            </div>

            <div class="right">
              <label class="marketer-description">
                How would you describe yourself?
                <span class="required">*</span>
              </label>
              <div class="flex-row">
                <label for class="radio-label">
                  <input
                    type="radio"
                    value="content-creator"
                    name="description"
                    v-model="marketer.type"
                  />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Content Creator</div>
                </label>
                <label for class="radio-label">
                  <input
                    type="radio"
                    value="thought-leader"
                    name="description"
                    v-model="marketer.type"
                  />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Thought Leader</div>
                </label>
                <label for class="radio-label">
                  <input
                    type="radio"
                    value="independent-marketer"
                    name="description"
                    v-model="marketer.type"
                  />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Independent Marketer</div>
                </label>
                <!--<div class="half half--marginRule">
                                    <span class="error"> {{errors.occupation}}</span>
                                    <div class="form-input form-input--marginOverrule">
                                        <label for="">Occupation</label>
                                        <input type="text" v-model="marketer.occupation">
                                    </div>
                                    <label><input type="checkbox" @change="changeIsStudent" :value="is_student"> I am a student </label>
                                </div>

                                <div class="half" v-if="!is_student">

                                    <span class="error" > {{errors.industry}}</span>
                                    <div class="form-input">

                                        <label for="">Industry</label>

                                        <select type="text" v-model="marketer.industry">
                                            <option :value="industry" v-for="industry in industries" :key="industry"> {{industry}}</option>
                                        </select>
                                    </div>
                </div>-->
              </div>
              <!--
                            <div class="platforms-used">
                                <p>Marketing platforms used</p>
                                <div class="platforms-used__platforms">

                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('blogs')">Blogs</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('facebook')">Facebook</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('instagram')">Instagram</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('tiktok')">TikTok</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('reddit')">Reddit</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('whatsapp')">Whatsapp</label>
                                    </div>
                                   <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('others')">Others</label>
                                    </div>
                                </div>
              </div>-->
            </div>
          </div>

          <div class="step2__item form-item">
            <div class="left">
              <p>Social Information</p>
              <p>Provide your social info.</p>
            </div>

            <div class="right">
              <div class="flex-row">
                <div class="half">
                  <div class="form-input">
                    <label for>Facebook profile</label>
                    <input type="text" v-model="marketer.socials.facebook" />
                  </div>
                </div>

                <div class="half">
                  <div class="form-input">
                    <label for>Instagram profile</label>
                    <input type="text" v-model="marketer.socials.instagram" />
                  </div>
                </div>
              </div>
              <div class="flex-row">
                <div class="half">
                  <div class="form-input">
                    <label for>LinkedIn profile</label>
                    <input type="text" v-model="marketer.socials.linkedIn" />
                  </div>
                </div>

                <div class="half">
                  <div class="form-input">
                    <label for>Twitter profile</label>
                    <input type="text" v-model="marketer.socials.twitter" />
                  </div>
                </div>
              </div>
              <div class="flex-row">
                <div class="half">
                  <div class="form-input">
                    <label for>Tiktok profile</label>
                    <input type="text" v-model="marketer.socials.tiktok" />
                  </div>
                </div>

                <div class="half">
                  <div class="form-input">
                    <label for>Youtube profile</label>
                    <input type="text" v-model="marketer.socials.youtube" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step2__button">
            <button class="back-btn" @click="goBack">Back</button>
            <div>
              <button
                @click="register"
                v-if="(mode === 1 && step ===2) || (mode === 2 && step === 3)"
              >Sign Up</button>
              <button @click="changeStep(3)" v-else>Continue</button>
            </div>
          </div>
        </div>

        <div class="finish-step" v-if="step === 'finish'">
          <div v-if="!verification_needed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;"
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                r="32"
                stroke-width="8"
                stroke="#d94241"
                stroke-dasharray="50.26548245743669 50.26548245743669"
                fill="none"
                stroke-linecap="round"
                style="animation-play-state: running; animation-delay: 0s;"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
                  style="animation-play-state: running; animation-delay: 0s;"
                />
              </circle>>
            </svg>
          </div>

          <p class="finish-step__status">{{status}}</p>

          <template v-if="verification_needed">
            <div class="verify">
              <div class="verify__inputs">
                <input class="verify__inputs__input" v-model="verification_otp[0]" type="text" />
                <input class="verify__inputs__input" v-model="verification_otp[1]" type="text" />
                <input class="verify__inputs__input" v-model="verification_otp[2]" type="text" />
                <input class="verify__inputs__input" v-model="verification_otp[3]" type="text" />
              </div>
              <div style="width: 100%; display: flex; justify-content: center;">
                <button @click="activateAccount" :disabled="!verificationOtpFilled">Activate Account</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import countries from "../../countries";
import Cookies from "js-cookie";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  components: {
    VuePhoneNumberInput
  },
  middleware({ redirect }) {
    return redirect("/");
  },

  data() {
    return {
      can_go_back: true,
      step: 1,
      mode: null,
      successful: false,
      status: "",
      verification_needed: false,
      verification_otp: ["", "", "", ""],
      created_user: {},
      countries: countries,

      is_student: false,

      error: "",
      errors: {
        name: "",
        user_name: "",
        industry: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        country: "",
        bio: "",
        occupation: ""
      },
      is_individual: 0,
      business: {
        name: "",
        user_name: "",
        industry: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        country: ""
      },
      marketer: {
        name: "",
        industry: "",
        occupation: "",
        bio: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        country: "",
        platforms_used: [],
        type: "",
        socials: {
          linkedIn: "",
          twitter: "",
          facebook: "",
          tiktok: "",
          instagram: "",
          youtube: ""
        }
      },
      industries: [
        "Arts and Entertainment",
        "Automotive",
        "Beauty and Fitness",
        "Books and Literature",
        "Business and Industrial Markets",
        "Computer and Electronics",
        "Finance",
        "Food and Drink",
        "Games",
        "Healthcare",
        "Hobbies and Leisure",
        "Home and Garden",
        "Internet and Telecommunication",
        "Jobs and Education",
        "Law and Government",
        "News",
        "Online Communities",
        "People and Society",
        "Pets and Animals",
        "Real Estate",
        "Reference",
        "Science",
        "Shopping",
        "Sports",
        "Travel",
        "Other"
      ]
    };
  },
  mounted() {
    this.setUpPasteAndEnterOtpEvent();
  },
  methods: {
    uploadLogo() {
      let input = document.getElementById("display-picture");

      if (input) {
        input = input.value;
        var startIndex =
          input.indexOf("\\") >= 0
            ? input.lastIndexOf("\\")
            : input.lastIndexOf("/");
        var filename = input.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }

        let label = "display-picture-label";
        label = document.getElementById(label);
        if (label) {
          label.innerText = filename;
        }
      }
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
          if (vm.mode === 1) {
            vm.business.profile_photo = response.secure_url;
          } else {
            vm.marketer.profile_photo = response.secure_url;
          }
          //vm.campaign.thumbnail = response.secure_url
        };

        fd.append("upload_preset", "jljh5lxc");
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", file);
        xhr.send(fd);
      } catch (e) {
        console.log(e);
      }
    },

    activateAccount() {
      this.can_go_back = false;
      this.verification_needed = false;
      this.status = "Activating your account";
      let payload = {};
      this.$api
        .post("/users/activate", {
          email: this.mode === 1 ? this.business.email : this.marketer.email,
          token: this.verification_otp.join("")
        })
        .then(resp => {
          if (this.mode === 1) payload = this.business;
          else payload = this.marketer;
          this.status = "Account activated. Signing you in";
          this.$store
            .dispatch("auth/login", payload)
            .then(resp => {
              this.$router.push({ path: "/dashboard/campaigns" });
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(err => {
          console.log(err);
          this.verification_needed = true;
          this.status =
            "Please enter the correct verification code to activate your account";
          //this.$store.dispatch('auth/')
        });
    },

    setUpPasteAndEnterOtpEvent() {
      const verify_inputs = window.document.getElementsByClassName(
        "verify__inputs__input"
      );
      if (verify_inputs) {
        for (let i = 0; i < verify_inputs.length; i++) {
          const input = verify_inputs[i];

          input.addEventListener("paste", event => {
            //input.removeEventListener('keydown')
            event.preventDefault();

            const text =
              event &&
              event.clipboardData &&
              event.clipboardData.getData("Text");
            // alert(text)
            if (text && text.length === 4 && !isNaN(parseInt(text))) {
              verify_inputs[0].value = text[0];
              verify_inputs[1].value = text[1];
              verify_inputs[2].value = text[2];
              verify_inputs[3].value = text[3];
            } else if (text.length === 1 && !isNaN(parseInt(text))) {
              input.value = text;
            }
          });
        }
      }
    },
    goBack() {
      if (this.step !== 1 && this.can_go_back) {
        this.step -= 1;
      }
    },
    switchMode(is_individual) {
      this.is_individual = is_individual;
    },

    addPlatform(p) {
      if (this.marketer.platforms_used.indexOf(p) > -1) {
        const index = this.marketer.platforms_used.indexOf(p);
        this.marketer.platforms_used.splice(index, 1);
      } else {
        this.marketer.platforms_used.push(p);
      }
    },

    canFinish() {
      let can_continue = true;
      if (this.mode === 1) {
        // for businesses

        for (let i = 0; i < Object.keys(this.business).length; i++) {
          const key = Object.keys(this.business)[i];
          if (!this.business[key]) {
            this.errors[key] = `${key} cannot be empty`;
            can_continue = false;
            //return false;
          } else {
            this.errors[key] = "";
          }
        }
      } else {
        for (let i = 0; i < Object.keys(this.marketer).length; i++) {
          const key = Object.keys(this.marketer)[i];
          const excludes = ["bio", "platforms_used", "industry", "occupation"];
          if (!this.marketer[key] && excludes.indexOf(key) == -1) {
            this.errors[key] = `${this.resolveFieldName(key)} cannot be empty`;
            can_continue = false;

            //return false;
          } else {
            this.errors[key] = "";
          }
        }
      }
      return can_continue;
    },

    selectMode(mode) {
      this.mode = mode;
    },
    changeStep(step) {
      if (step === 3) {
        //

        let go = true;
        const fields = [
          "name",
          "email",
          "password",
          "confirm_password",
          "phone_number",
          "country"
        ];

        fields.forEach(field => {
          if (!this.marketer[field]) {
            this.errors[field] = `${this.resolveFieldName(
              field
            )} cannot be empty`;
            go = false;
          }
        });

        if (!go) return;
      }
      this.step = step;
    },
    changeIsStudent() {
      this.is_student = !this.is_student;
      if (this.is_student) this.marketer.occupation = "Student";
    },
    resolveFieldName(field) {
      field = capitalize(field);
      // remove _
      const split_string = field.split("_");

      return split_string.join(" ");

      function capitalize(string) {
        const first = string[0];
        return first.toUpperCase() + string.slice(1);
      }
    },

    validateInformation() {
      if (this.mode === 1) {
        if (
          this.business.password !== this.business.confirm_password ||
          this.marketer.password !== this.marketer.confirm_password
        ) {
          this.errors["password"] = "Passwords don't match";
        } else {
          this.errors["password"] = "";
        }
      } else {
      }
    },
    errorsExist() {
      for (let i = 0; i < Object.keys(this.errors).length; i++) {
        const key = this.errors[Object.keys(this.errors)[i]];

        if (key) {
          return true;
        }
      }
      return false;
    },

    register() {
      this.validateInformation();

      this.canFinish();

      console.log(this.errors);

      if (!this.errorsExist()) {
        this.step = "finish";
        let payload = {};

        if (this.mode === 1) payload = this.business;
        else payload = { ...this.marketer, is_individual: 1 };

        //if (this.is_student || this.marketer.occupation === "Student") payload.industry = "Student";

        this.error = "";
        this.status = "Signing you up...";
        this.$api
          .post("/auth", payload)
          .then(resp => {
            this.successful = true;
            this.can_go_back = false;

            this.setUpPasteAndEnterOtpEvent();
            this.verification_needed = true;
            //login
            this.status =
              "We've sent a verification code to your email. Please paste the 4 digit code to complete the creation of your account";

            /*this.$store.dispatch('auth/login', payload).then(resp=> {
                            this.$router.push({path: '/dashboard/campaigns'})
                        })*/
          })
          .catch(err => {
            this.successful = false;
            this.error =
              (err.response && err.response.data.data) ||
              err.response.data.message;

            if (this.error.indexOf("Validation") > -1) {
              this.error = "Account with name or phone already exists";
            }
            this.step = 2;
          });
      }
    },

    login() {
      const payload = {
        email: this.mode === 1 ? this.business.email : this.marketer.email,
        password:
          this.mode === 1 ? this.business.password : this.marketer.password
      };
      this.$store
        .dispatch("auth/login", this.payload)
        .then(resp => {
          this.status = "Redirecting you to the dashboard...";
          this.$cookies.remove("aff-token", { path: "" });
          this.$cookies.set("aff-token", resp.data.data.token);
        })
        .catch(err => {
          this.status = "Error signing in";
        });
    },

    goHome() {
      this.$router.push("/");
    }
  },

  computed: {
    computedCountries() {
      if (this.countries) {
        return this.countries.filter(c => c.name === "Nigeria");
      }
      return [];
    },
    pageIntent() {
      return this.$route.query.intent;
    },
    verificationOtpFilled() {
      let filled = true;
      this.verification_otp.forEach(digit => {
        if (!digit) {
          filled = false;
        }
      });
      return filled;
    }
  }
};
</script>


<style lang="scss" scoped>
.required {
  color: red;
  margin-left: 5px;
}
.marketer-description {
  color: grey;
  font-size: 15px;
  margin-bottom: 8px;
  display: block;
  //font-weight: 500;
}
.radio-label {
  position: relative;

  display: flex;
  padding: 8px 16px;
  align-items: center;
  //border: 1px solid #d6d6e7;
  border-radius: 5px;
  margin-right: 8px;
  //box-shadow: inset 0 1px 4px 0 rgb(227 160 158 / 20%);
  transition: all 100ms ease-in-out;
  height: 50px;
  background: rgba(211, 211, 211, 0.247);

  @include media("<=t") {
    margin-bottom: 16px;
  }

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
    font-size: 14px;
    opacity: 0;
    background: none !important;
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
    font-size: 13px;
    font-weight: 400;
  }

  input:checked + .radio-indicator {
    background: $lightaccent;
  }
}
.form-input-file {
  .file-container {
    background: transparent !important;
    border: none !important;
  }
  .file-container,
  button {
    border: 1px solid #d6d6e7;
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: lightgrey;
    background: lightgrey;
    border-radius: 3px;
    color: $charcoal;
    font-size: 13px;

    label {
      color: $charcoal;
      font-size: 13px;
      //text-decoration: underline;
    }

    input {
      // visibility: hidden;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;

      //position: absolute;
    }
  }
}
.form-input-file {
  background: rgba(211, 211, 211, 0.247);
  border-radius: 5px;
  min-height: 55px;
  outline: none;
  margin-bottom: 24px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  color: grey;
}
.verify {
  width: 100%;
  &__inputs {
    display: flex;
    width: 40%;
    justify-content: space-between;
    margin: auto;

    input {
      @include plain-form-input;
      width: 70px;
      height: 70px;
      display: block;
      border-radius: 5px;
      text-align: center;
      border: 2px solid lightgrey;

      &:focus {
        outline-color: $primary;
      }
    }
  }
  button {
    @include largebutton;
  }
}
.back-btn {
  background: white !important;
  color: black !important;
  border: 1px solid white !important;
}

.logo {
  //margin-bottom: 40px;
  padding: 0 36px;
  cursor: pointer;

  img {
    object-fit: contain;
    height: auto;
    margin: auto;
    margin-bottom: 50px;
    width: 120px !important;
    margin: 0;
  }
}
.already {
  display: block;
  font-size: 15px;
  color: $faint;
  text-align: center;

  a {
    color: $lightaccent !important;
    text-decoration: none;
  }
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @include media("<=t") {
    flex-direction: column;
    justify-content: center;
  }
}
.platforms-used {
  background: rgba(211, 211, 211, 0.247);
  padding: 10px;
  p {
    display: block;
    color: $faint;
    font-size: 12px;
    font-weight: 600;
  }

  &__platforms {
    display: flex;
    flex-wrap: wrap;
    div {
      display: flex;
      flex-wrap: wrap;
      margin-right: 8px;
      align-items: center;

      label {
        color: $faint;
        font-size: 15px;
        margin-right: 8px;
      }

      input {
        margin-right: 5px;
      }
    }
  }
}
.error {
  @include error;
  @include media("<=t") {
    font-size: 12px;
  }
}

.half {
  width: 48%;
  @include media("<=t") {
    width: 100%;
  }

  &--marginRule {
    margin-bottom: 25px;

    @include media("<=t") {
      margin-bottom: 16px;
    }
  }

  label {
    color: $faint;
    font-size: 15px;
    display: flex;
    align-items: center;
    input {
      margin-right: 2px;
    }
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

  @include media("<=t") {
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
  textarea,
  &:deep(input) {
    height: 100%;
    width: 100%;
    background: transparent;
    border: 0;
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
      outline: 2px solid $lightaccent;
    }
  }
  &:deep(.vue-phone-number-input),
  &:deep(.input-tel) {
    min-height: 55px;
  }
  &:deep(input) {
    &::placeholder {
      margin-top: -20px;
      font-size: 12px;
      color: grey;
      font-weight: 600;
      position: absolute;
      top: 0;
      left: 10px;
      right: 10px;
      top: 30px;
    }
  }
  &:deep(.country-selector__label) {
    visibility: hidden;
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
.logo {
  font-size: 30px;
  @include media("<=tablet") {
    display: block;
    text-align: center;
    margin-bottom: 16px;
  }
}

.step-active {
  .circle {
    background: $primary;
    border: $primary;
  }
  p {
    color: $primary !important;
  }
}

.header {
  //width: 80%;
  //margin: auto;
  padding: 16px 0;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

  &__container {
    @include container;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include media("<=tablet") {
      flex-direction: column;
      flex-wrap: wrap;
    }
  }

  &__steps {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media("<=tablet") {
      flex-wrap: wrap;
      align-items: center;
      justify-content: left;
    }

    &__item {
      cursor: pointer;
      display: flex;
      align-items: center;
      @include media("<=tablet") {
        margin-bottom: 8px;
        margin-right: 8px;
      }
      div {
        margin-right: 8px;
      }
      p {
        color: lightgrey;
        display: inline-block;
        font-size: 16px;
        @include media("<tablet") {
          font-size: 14px;
        }
      }
    }

    &__divider {
      height: 2px;
      margin: 0 16px;
      width: 10px;
      background: rgba(211, 211, 211, 0.331);
      @include media("<=tablet") {
        display: none;
      }
    }
  }
}

.body {
  &__container {
    @include container;
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

.step1 {
  //@include container;
  &__header {
    margin: auto;
    margin-top: 50px;
    font-size: 40px;
    width: 100%;
    text-align: center;
    margin-bottom: 24px;

    @include media("<=t") {
      margin-top: 20px;
      font-size: 25px;
    }
  }

  &__choice {
    display: flex;
    justify-content: center;

    @include media("<=tablet") {
      display: flex;
      flex-direction: column;
    }

    &__item {
      cursor: pointer;
      border: 0.5px solid lightgrey;
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      width: 45%;
      @include media("<=tablet") {
        margin-right: 0 !important;
        margin-bottom: 16px;
      }
      &:first-of-type {
        margin-right: 16px;
      }

      &__illustration {
        width: 15%;
        max-height: 180px;
        margin-right: 16px;
        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }

      &__header {
        width: 100%;
        p {
          font-weight: 600;
          color: black !important;
        }
      }

      p {
        color: $faint;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: center;

    button {
      @include largebutton;
      margin-top: 36px;
    }
  }
}

.step1__selected {
  border: 1px solid $primary;
  p {
    color: $primary !important;
  }
  .circle {
    background: $primary !important;
    border: $primary !important;
  }
}

.step2 {
  margin-top: 100px;

  &__button {
    display: flex;
    justify-content: flex-end;
    button {
      width: 200px !important;
      @include largebutton;
    }
  }
}

.form-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;

  @include media("<=t") {
    flex-direction: column;
  }
  .left {
    width: 40%;
    @include media("<=t") {
      width: 100%;
    }
    p {
      color: $faint;
      line-height: 20px;
      margin-bottom: 16px;
      @include media("<=t") {
        margin-bottom: 8px;
        font-size: 15px;
      }
      &:first-of-type {
        line-height: 30px;
        color: black !important;
        font-size: 32px;
        font-weight: 600;

        @include media("<=t") {
          line-height: 25px;
          font-size: 20px;
        }
      }
    }
  }

  .right {
    width: 60%;
    @include media("<=t") {
      width: 100%;
    }
  }
}

.finish-step {
  div {
    //width: 20%;
    margin: auto;
  }
  svg {
    width: 100px;
  }

  p {
    @include media("<=t") {
      font-size: 14px;
    }
    margin-top: 30px;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>