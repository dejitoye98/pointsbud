<template>
  <div>
    <CreatedCampaignModal :show="show_success_modal" @close="show_success_modal=false" />

    <div class="center">
      <p>Create a Pay-Per-Sale Campaign</p>
    </div>
    <div class="traffic">
      <div class="steps">
        <div class="steps__step">
          <div class="step-card">
            <div class="steps__step__header">
              <div class="steps__step__header__container">
                <p>General Details</p>
                <span>Title, description, budget, display picture...</span>
              </div>
            </div>
            <div class="steps__step__body">
              <div class="form">
                <div class="form__container">
                  <div class="form-input">
                    <span class="error" v-if="errors">{{errors.title}}</span>
                    <label for>
                      Campaign Title
                      <span class="red">*</span>
                    </label>
                    <input v-model="campaign.title" type="text" />
                  </div>
                  <div class="form-input">
                    <span class="error">{{errors.description}}</span>
                    <label for>
                      Description
                      <span class="red">*</span>
                    </label>
                    <textarea v-model="campaign.description"></textarea>
                  </div>
                  <!--
                                        <div class="form-input">
                                            <span class="error">{{errors.title}}</span>
                                            <label for="">Payment model <span class="red">*</span></label>
                                            <div class="flex-row">
                                                <label class="checkbox-label" v-for="(model, index) in template.payment_models" :key="index"><input @change="addPaymentModel(model)"  type="checkbox"/>{{model}}</label>
                                            
                                            </div>

                  </div>-->
                  <div class="half">
                    <div class="form-input">
                      <span class="error">{{errors.marketeres_required}}</span>
                      <label for>No. of Marketers Required</label>
                      <div class="form-input__info" v-if="extraInfos['marketers_required'].visible">
                        <p>{{extraInfos['marketers_required'].text}}</p>
                      </div>
                      <input v-model="campaign.marketers_required" type="number" />
                    </div>

                    <div class="form-input">
                      <span class="error">{{errors.marketeres_required}}</span>
                      <label for>Do you want to host your products on Afflee?</label>
                      <div class="flex-row flex-row--w-50">
                        <label class="radio-label">
                          <input
                            @change="changeProductHosting(1)"
                            :value="parseInt('0')"
                            name="who_can_join"
                            type="radio"
                            :checked="campaign.products.hosted"
                          />
                          <div class="radio-indicator"></div>
                          <div class="radio-text">Yes</div>
                        </label>
                        <label class="radio-label">
                          <input
                            @change="changeProductHosting(0)"
                            :value="parseInt('1')"
                            name="who_can_join"
                            type="radio"
                            :checked="!campaign.products.hosted"
                          />
                          <div class="radio-indicator"></div>
                          <div class="radio-text">No, I have my own website</div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="half">
                    <div class="form-input">
                      <span class="error">{{errors.ends_at}}</span>
                      <label for>End Date</label>
                      <DatePicker v-model="campaign.ends_at" />
                    </div>
                    <div class="form-input form-input-file">
                      <label for>Display Picture</label>

                      <div class="file-container">
                        <label id="display-picture-label">Choose file</label>
                        <input
                          @change="getFileName('display-picture')"
                          type="file"
                          id="display-picture"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="steps__step">
      <div class="step-card">
        <div class="steps__step__header">
          <div class="steps__step__header__container">
            <p>Product Details</p>
            <span>Title, description, budget, display picture...</span>
          </div>
        </div>

        <div class="form">
          <div class="form__container">
            <div
              class="form-group advert-link"
              v-for="(product,index) in campaign.products.list"
              :key="index"
            >
              <div class="green">Product {{index + 1}}</div>
              <div class="advert-link-head" v-if="index !== 0" @click="removeProduct(index)">
                <span>Remove</span>
              </div>
              <div class="form-group form-group--row advert-link-row">
                <div class="form-input">
                  <label for>
                    Product Name
                    <span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Afflee's marketing software"
                    v-model="product.name"
                  />
                </div>
                <div class="form-input">
                  <label for>
                    Product Description
                    <span class="red">*</span>
                  </label>
                  <textarea type="text" placeholder v-model="product.description"></textarea>
                </div>
                <div class="form-input">
                  <label for>
                    Advert note
                    <span class="info">info</span>
                    <span class="red">*</span>
                  </label>
                  <textarea
                    placeholder="This is the text that marketers will use in advertising this link to their audience"
                    v-model="product.advert_note"
                  ></textarea>
                </div>

                <div class="form-input" v-if="!campaign.products.hosted">
                  <label for>
                    Link to Product
                    <span class="red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Afflee's marketing software"
                    v-model="product.link"
                  />
                </div>

                <div class="half" v-if="campaign.products.hosted">
                  <div class="form-input">
                    <label for>
                      Quantity Available
                      <span class="red">*</span>
                    </label>
                    <input type="number" v-model="product.qty" />
                  </div>

                  <div class="form-input">
                    <label for>Quantity Per Unit</label>
                    <input type="number" value="1" v-model="product.qty_per_unit" />
                  </div>
                </div>

                <div class="half">
                  <div class="form-input">
                    <span class="error">{{errors.budget}}</span>
                    <label for>
                      Price Per Unit
                      <span class="red">*</span>
                      <span class="info" @click="setInfoVisibility('budget')">info</span>
                    </label>
                    <!--<input  v-model="campaign.budget" type="number"-->
                    <div style="width: 98%; height:50px; border-radius:4px;        ">
                      <div class="form-input__info" v-if="extraInfos['budget'].visible">
                        <p>{{extraInfos['budget'].text}}</p>
                      </div>
                      <CurrencyMoneyInput @onChange="setPricePerUnit" :meta="{index: index}" />
                    </div>
                  </div>

                  <div class="form-input">
                    <label for>Discount (%)</label>
                    <input type="number" v-model="product.discount" />
                  </div>
                </div>

                <div class="half">
                  <div class="form-input">
                    <span class="error">{{errors.budget}}</span>
                    <label for>
                      Marketer Commission Amount
                      <span class="red">*</span>
                      <span class="info" @click="setInfoVisibility('budget')">info</span>
                    </label>
                    <!--<input  v-model="campaign.budget" type="number"-->
                    <div style="width: 98%; height:50px; border-radius:4px;        ">
                      <div class="form-input__info" v-if="extraInfos['budget'].visible">
                        <p>{{extraInfos['budget'].text}}</p>
                      </div>
                      <input type="number" v-model="product.marketer_commission" />
                    </div>
                  </div>
                  <div class="form-input">
                    <label for>Market Commission Type</label>
                    <select v-model="product.marketer_commission_type">
                      <option value="flat">Flat</option>
                      <option value="percent">Percent</option>
                    </select>
                  </div>
                </div>
                <div class="form-input form-input-file">
                  <label for>Product Images</label>

                  <!-- <label :id="`product-${index}-images-label`">Choose file</label>-->
                  <button
                    @click="showProductImagesModal(index)"
                    @onImageUpdate="updateProductImages"
                    :id="`product-${index}-images`"
                  >Choose files</button>
                </div>
              </div>
              <div
                v-if="campaign.products.list[index].meta.length > 0"
                class="advert-link form-group"
              >
                <div class="form-group__header">
                  <p>Product Features</p>
                </div>
                <div
                  class="form-input"
                  v-for="(meta, meta_index) in campaign.products.list[index].meta"
                  :key="meta_index"
                >
                  <input
                    type="text"
                    width="100%"
                    :placeholder="'feature ' +parseInt( parseInt(meta_index) + 1)"
                    v-model="campaign.products.list[index].meta[meta_index]"
                  />
                </div>

                <div class="add-link">
                  <a @click="addProductMeta(index)">+ Add Feature</a>
                </div>
              </div>
              <div
                v-if="campaign.products.list[index].delivery_details.length > 0"
                class="advert-link form-group"
              >
                <div class="form-group__header">
                  <p>Delivery Details</p>
                </div>
                <div
                  class="form-input"
                  v-for="(meta, meta_index) in campaign.products.list[index].delivery_details"
                  :key="meta_index"
                >
                  <div class="half">
                    <input
                      type="text"
                      style="display: block; width: 49%"
                      width="100%"
                      :placeholder="meta.name_placeholder"
                      v-model="meta.name"
                    />
                    <input
                      type
                      style="display: block; ; width: 49%"
                      width="100%"
                      :placeholder="meta.value_placeholder"
                      v-model="meta.value"
                    />
                  </div>
                </div>

                <div class="add-link">
                  <a @click="addProductDeliveryDetails(index)">+ Add detail</a>
                </div>
              </div>
              <!---<div class="product-actions" v-if="campaign.products.hosted">-->
              <!--<button @click="addProductMeta(index)" v-if="campaign.products.list[index].meta.length < 1">Add Product Features</button> -->
              <!-- <button @click="addProductDeliveryDetails(index)">Add Delivery Details</button>-->
              <!--<button @click="addVariationMeta">Add Product Variations</button>-->
              <!--</div>-->
            </div>
            <div class="add-link">
              <button @click="addProduct">Add Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="steps__step">
      <div class="step-card">
        <div class="steps__step__header">
          <div class="steps__step__header__container">
            <p>Order Form</p>
            <span>This is the information that you want to collect from customers</span>
          </div>
        </div>
        <div class="form">
          <div class="form__container">
            <div
              class="form-input"
              v-for="(field, field_index) in campaign.order_form"
              :key="field_index"
            >
              <div class="flex-row field-header">
                <label for>Field {{field_index + 1}}</label>
                <span @click="removeFieldFromOrderForm(field_index)">Remove</span>
              </div>
              <template v-if="!field.changeable">
                <input style="margin-bottom: 5px;" type="text" :value="field.field_name" disabled />
                <select disabled>
                  <option>{{field.field_type}}</option>
                  <option
                    v-for="(type, type_index) in ['text', 'number', 'date', 'one choice question', 'multi-choice question'].filter(a=> a!==field.field_type)"
                    :key="type_index"
                  >{{type}}</option>
                </select>
              </template>

              <template v-else>
                <input
                  placeholder="Field Name (e.g Age)"
                  style="margin-bottom: 5px;"
                  type="text"
                  v-model="campaign.order_form[field_index].field_name"
                />
                <select
                  v-model="campaign.order_form[field_index].field_type"
                  style="margin-bottom: 5px;"
                >
                  <option
                    v-for="(type, type_index) in ['text', 'number', 'date', 'one-choice option', 'multi-choice options']"
                    :key="type_index"
                  >{{type}}</option>
                </select>
                <!--- options --->
                <template
                  v-if="['one-choice option', 'multi-choice option'].includes(campaign.order_form[field_index].field_type)"
                >
                  <input
                    v-model="campaign.order_form[field_index].field_options[option_index]"
                    style="margin-bottom: 5px;"
                    type="text"
                    :placeholder="'option '  + (parseInt(option_index) + parseInt(1))"
                    v-for="(option , option_index) in campaign.order_form[field_index].field_options"
                    :key="option_index"
                  />
                  <button class="add-link" @click="addOptionToField(field_index)">Add Option</button>
                </template>
              </template>
            </div>
            <div class="add-link">
              <a @click="addFieldToOrderForm">+ Add Field</a>
            </div>

            <!--
                                <div class="form-input">
                                    <label class="bold-label" for="">Accept traffic to links from: Default()</label>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <label class="checkbox-label"  v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                                        <label class="checkbox-label"  v-for="country in countries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
                                    </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>

    <div class="steps__step">
      <div class="step-card">
        <div class="steps__step__header">
          <div class="steps__step__header__container">
            <p>Privacy & Settings</p>
            <!--<span>Title, description, budget, display picture...</span>-->
          </div>
        </div>
        <div class="form">
          <div class="form__container">
            <div class="form-input">
              <span class="error" v-if="errors.who_can_join">{{errors.who_can_join}}</span>
              <label for class>
                Who can join this campaign?
                <span class="red">*</span>
                <span class="info" @click="setInfoVisibility('who_can_join')">info</span>
              </label>
              <div class="form-input__info" v-if="extraInfos['who_can_join'].visible">
                <p>{{extraInfos['who_can_join'].text}}</p>
              </div>
              <div class="flex-row">
                <label class="radio-label">
                  <input v-model="campaign.who_can_join" value="0" type="radio" name="who_can_join" />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Anyone</div>
                </label>
                <label class="radio-label">
                  <input v-model="campaign.who_can_join" value="1" type="radio" name="who_can_join" />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Invited Marketers</div>
                </label>
                <label class="radio-label">
                  <input v-model="campaign.who_can_join" value="2" type="radio" name="who_can_join" />
                  <div class="radio-indicator"></div>
                  <div class="radio-text">Applicants</div>
                </label>
              </div>
            </div>

            <div class="application_questions" v-if="[2, '2'].includes(campaign.who_can_join)">
              <div
                v-for="(q, q_index) in campaign.application_questions"
                :key="index"
                class="form-input"
              >
                <span class="error" v-if="index === 0">{{errors.application_questions}}</span>
                <label for>
                  Application Question {{q_index + 1}}
                  <span class="red" v-if="index === 0">*</span>
                </label>
                <input
                  type="text"
                  placeholder="eg: How many clicks can you drive to this campaign?"
                  v-model="campaign.application_questions[index]"
                />
                <select>
                  <option
                    v-for="(type, q_index) in ['text', 'number', 'date', 'one-choice option', 'multi-choice options']"
                    :key="q_index"
                  >{{q_index}}</option>
                </select>
              </div>
              <div class="add-link" style="padding-top: 0px !important">
                <button click="addQuestion">Add Question</button>
              </div>
            </div>

            <div class="form-input">
              <label for class>
                Do you intend to add more products to this campaign in the future?
                <span @click="setInfoVisibility('recurring_links')" class="info">info</span>
              </label>
              <div class="form-input__info" v-if="extraInfos['recurring_links'].visible">
                <p>{{extraInfos['recurring_links'].text}}</p>
              </div>
              <div class="flex-row">
                <label class="checkbox-label">
                  <input v-model="campaign.recurring_links" value="0" name="intent" type="radio" />Yes
                  <span></span>
                </label>
                <label class="checkbox-label">
                  <input v-model="campaign.recurring_links" value="1" name="intent" type="radio" />No
                  <span></span>
                </label>
              </div>
            </div>

            <!--
                                <div class="form-input">
                                    <label class="bold-label" for="">Accept traffic to links from: Default()</label>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <label class="checkbox-label"  v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                                        <label class="checkbox-label"  v-for="country in countries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
                                    </div>
            </div>-->
          </div>
        </div>
      </div>
    </div>

    <div class="create-button">
      <button @click="createCampaign">Create Campaign</button>
    </div>

    <template v-if="show_product_images_modal">
      <SelectProductImagesModal
        @onImageUpdated="updateProductImages"
        @onImagesSelected="addProductImages"
        :product_index="product_index_in_view"
        v-if="show_product_images_modal"
        @close="closeProductImagesModal"
      />
    </template>
  </div>
</template>





<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import continents from "../continents"; //'../../continents'
import countries from "../countries";

import NewCampaign from "../components/NewCampaign"; //'../../../components/NewCampaign';
import CurrencyMoneyInput from "../components/inputs/CurrencyMoneyInput";

import SelectCountriesInput from "../components/inputs/SelectCountriesInput";
import SelectProductImagesModal from "../components/modals/select-product-images-modal";
import CreatedCampaignModal from "../components/modals/created-campaign-modal";
export default {
  components: {
    SelectCountriesInput,
    CurrencyMoneyInput,
    DatePicker,
    SelectProductImagesModal,
    CreatedCampaignModal
  },
  computed: {
    drafts() {
      return (
        (window.localStorage.getItem("drafts") &&
          JSON.stringify(window.localStorage.getItem("drafts"))) ||
        []
      );
    }
  },
  data() {
    return {
      show_success_modal: false,
      product_index_in_view: 0,
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
      product_errors: [""],
      can_continue: true,
      campaign: {
        purpose: "sales",
        title: "",
        description: "",
        budget: "",
        links_to_advertise: [{ link: "", pay_per_click: "", advert_note: "" }],
        ends_at: "",
        thumbnail: "",
        countries_allowed: [],
        recurring_links: "",
        who_can_join: null,
        pay_currency: "NGN",
        application_questions: [""],
        categories: ["", ""],

        order_form: [
          {
            field_name: "Full name",
            field_type: "text",
            field_options: [],
            changeable: false
          },
          {
            field_name: "Email Address",
            field_type: "text",
            changeable: false
          }
        ],

        products: {
          hosted: 1,
          list: [
            {
              link: "",
              name: "",
              description: "",
              marketer_commission: "",
              marketer_commission_type: "",
              thumbnail: "",
              images: [],
              temp_images: [],
              advert_note: "",

              delivery_details: [
                { name: "Delivery Medium", value: "Email Address" }
              ],

              variation_details: {},
              meta: [""],
              qty: {},
              qty_per_unit: 1,
              unit_price: 0,
              currency: "",
              discount: 0,
              discount_type: ""
            }
          ]
        }
      },
      template: {
        payment_models: ["Pay per click", "Pay per lead", "Pay per sale"]
      },
      loading: false,

      draftId: this.$route.query["draft"] || "",
      show_product_images_modal: false
    };
  },
  mounted() {
    if (!this.draftId) {
      this.draftId = Date.now();
    }

    // save every 2 seconds
  },
  methods: {
    addOptionToField(field_index) {
      this.campaign.order_form[field_index].field_options.push("");
    },
    removeFieldFromOrderForm(index) {
      this.campaign.order_form.splice(index, 1);
    },
    addFieldToOrderForm() {
      this.campaign.order_form.push({
        field_name: "",
        field_type: "",
        field_options: ["", ""],
        changeable: true
      });
    },
    updateProductImages(obj) {
      this.campaign.products.list[obj.product_index].images = obj.images;
    },
    closeProductImagesModal() {
      this.show_product_images_modal = false;
    },
    showProductImagesModal(product_index) {
      this.show_product_images_modal = true;
      this.product_index_in_view = product_index;
    },
    removeProductImage(index, product_index) {},
    handleMultipleFilesAndUpload(element, product_index) {
      const product_images = document.getElementById(element);
      const vm = this;
      if (product_images) {
        for (let i = 0; i < product_images.files.length; i++) {
          const image = product_images.files[i];
          var reader = new FileReader();
          reader.onload = function() {
            vm.campaign.products.list[product_index].images.push({
              image: reader.result,
              loading: true
            });

            // start upload
            const result = vm.uploadProductImage(image, product_index, i);
            /* if (result) {
                             vm.campaign.products.list[product_index].temp_images[i].loading = false
                        }*/
          };

          reader.readAsDataURL(product_images.files[i]);
        }
      }
    },
    getFileName(element) {
      let el = document.getElementById(element);

      if (el) {
        el = el.value;
        var startIndex =
          el.indexOf("\\") >= 0 ? el.lastIndexOf("\\") : el.lastIndexOf("/");
        var filename = el.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }

        let label = element + "-label";
        label = document.getElementById(label);
        if (label) {
          label.innerText = filename;
        }
      }
    },
    setPricePerUnit(meta) {
      this.campaign.products.list[meta.index].unit_price = meta.value;
    },
    changeProductHosting(value) {
      const s = this.$set(this.campaign.products, "hosted", value);
    },
    deleteProductMeta(index) {
      this.campaign.products.list[index].meta = [];
    },
    addProductMeta(index) {
      this.campaign.products.list[index].meta.push("");
    },
    deleteProductDeliveryDetails(index) {
      this.campaign.products.list[index].delivery_details = [];
    },
    addProductDeliveryDetails(index) {
      this.campaign.products.list[index].delivery_details.push({
        name: "",
        name_placeholder: "Detail",
        value: "",
        value_placeholder: "Value"
      });
    },
    addDeliveryMeta(index) {
      if (this.campaign.products.list[index].delivery_details.length == 0)
        this.campaign.products.list[index].delivery_details.push({
          name: "",
          name_placeholder: "eg: (Delivery Date)",
          value: "",
          value_placeholder: "Value"
        });
      else
        this.campaign.products.list[index].delivery_details.push({
          name: "",
          name_placeholder: "eg: (Size of product)",
          value: "",
          value_placeholder: "Value"
        });
    },
    addVariationMeta(index) {},
    autoSave() {
      if (this.mode === "choice") return;
      console.log("autosaving");
      let draft = {
        id: this.draftId,
        campaign: this.campaign
      };
      let drafts =
        (window.localStorage.getItem("drafts") &&
          JSON.parse(window.localStorage.getItem("drafts"))) ||
        [];

      const draft_exists = drafts.find(d => d.id === this.draftId);
      if (draft_exists) {
        const index = drafts.indexOf(draft_exists);
        drafts[index] = draft;
      } else {
        drafts.push(draft);
      }
      drafts = JSON.stringify(drafts);
      window.localStorage.setItem("drafts", drafts);
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
      this.campaign.application_questions.push({
        question: "",
        answer_type: ""
      });
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
      //this.validateSteps()

      if (this.can_continue) {
        this.campaign.recurring_links = this.campaign.recurring_links
          ? parseInt(this.campaign.recurring_links)
          : "";
        const payload = this.campaign;
        this.loading = true;

        this.campaign.products.list.forEach(p => {
          if (p.images && p.images.length > 0) {
            return (p.images = p.images.map(image => image && image.url));
          }
        });
        this.$api
          .post("/campaigns", payload)
          .then(resp => {
            this.loading = false;

            this.show_success_modal = true;
            //this.$router.push('/dashboard/campaigns')
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
    uploadProductImage(file, product_indext, image_index) {
      const vm = this;

      const cloudinary_url =
        "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
      try {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        const vm = this;

        xhr.open("POST", cloudinary_url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        return (xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          }

          //const displayElement = document.createElement('img');
          //displayElement.src = response.secure_url
          //editor.append(displayElement)

          //vm.campaign.thumbnail = response.secure_url
          vm.campaign.products.list[product_index].images[
            image_index
          ].loading = false;
        });

        fd.append("upload_preset", "jljh5lxc");
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", file);
        xhr.send(fd);
      } catch (e) {
        console.log(e);
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

    removeProduct(index) {
      this.campaign.products.list.splice(index, 1);
      this.product_errors.splice(index, 1);
    },

    addProductImages(obj) {
      alert(Object.keys(obj));
      if (typeof obj.product_index !== "undefined") {
        alert("erere");
        this.campaign.products.list[obj.product_index].images = obj.images;
        //this.campaign.products.list[obj.product_index].images = obj.images;
      }
    },

    addProduct() {
      this.campaign.products.list.push({
        name: "",
        description: "",
        marketer_commission: "",
        marketer_commission_type: "",
        thumbnail: "",
        images: [],
        advert_note: "",

        delivery_details: [{ name: "Delivery Medium", value: "Email Address" }],

        variation_details: {},
        meta: [""],
        qty: {},
        unit_price: 0,
        currency: "",
        discount: 0,
        discount_type: ""
      });
      this.product_errors.push("");
    }
  }
};
</script>


<style lang="scss" scoped>
.field-header {
  //border: 1px solid grey;
  display: flex !important;
  justify-content: space-between;
  width: 100%;
  span {
    display: block;
    color: $lightaccent;
    font-size: 14px;
  }
}
.create-button {
  //border: 1px solid grey;
  margin-left: 50px;
  width: 100%;

  button {
    @include largebutton;
    width: 100%;
  }
}
.product-actions {
  display: grid;
  //flex-direction: column;
  grid-template-columns: 30% 30% 30%;
  width: 100%;
  button {
    @include editbutton;
    margin-left: 0;
    margin-right: 8px;
  }
}
.error,
.red {
  font-size: 12px;
  color: red;
}

.create-container {
  //border: 1px solid grey;
  display: flex;
  justify-content: flex-end;
  margin-left: 55px;
  width: 100%;

  button {
    @include largebutton;
    width: 200px;
    padding: 8px;
    border-radius: 4px;
  }
}
.container {
  width: 60%;
  padding: 75px 24px;
  margin: auto;
}

.section {
  &__title {
    color: lightgrey;
    font-size: 25px;
    text-align: center;
    margin-bottom: 16px;
    //margin-bottom: 16px;

    span {
      font-size: 16px;
      color: $charcoal;
      margin-top: 16px;
    }

    &--drafts {
      margin-top: 50px;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
  }
}

.flex-row {
  display: grid;
  grid-template-columns: 30% 30% 30%;

  width: 100%;

  &--w-50 {
    grid-template-columns: 49% 49% !important;
    .checkbox-label {
      input {
        width: 20% !important;
        border: 0 !important;
      }
    }
  }
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
  //padding: 4px 8px;
  font-weight: 300 !important;
  //background: white;
  //border: 1.5px solid rgba(169, 169, 169, 0.64);
  //border: 1.5px solid #ced4da58 !important;
  //border: 1px solid rgba(169, 169, 169, 0.64) !important;

  margin-bottom: 5px;

  input {
    margin-right: 8px;
    min-height: 20px !important;
    appearance: auto !important;
    width: 10% !important;
    border: 0 !important;
  }
}
.new-card {
  height: auto;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  //padding: 16px;
  border: 1.5px solid rgba(211, 211, 211, 0.442);
  background: white !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  &:hover {
    border: 1px solid $lightaccent;
  }
  //margin-top: 50px;

  .svg-container {
    width: 50%;
    margin: auto;
    margin-bottom: 8px;
  }

  p {
    color: $charcoal;
    font-size: 18px;
    text-align: center;
  }

  span {
    color: darkgrey;
    font-size: 13px;
    text-align: center;
  }
}
.draft-card {
  cursor: pointer;

  height: auto;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  //padding: 16px;
  border: 1.5px solid rgba(211, 211, 211, 0.442);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;

  &__body {
    // height: 200px;
    padding: 8px 0px;
    color: $charcoal;
    p {
      &:first-of-type {
        font-weight: 700;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    //border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
    button {
      @include editbutton;
      width: auto;
      border: 0.5px solid lightgray;
      color: lightgray;
      height: auto;
      min-height: auto;
      padding: 2px 5px;
    }

    p {
      color: $charcoal;
      font-size: 16px !important;
      text-transform: none;
      font-weight: 700;
      display: block;
      width: 100%;
    }
  }
}

.form-group {
  margin-bottom: 16px;
  &__header {
    display: flex;
    justify-content: space-between;
    //border-bottom: 0.2px lightgrey solid;
    margin-bottom: 8px;
  }
  p {
    font-size: 15px;
    font-weight: 500;
    color: $charcoal;
  }
}

.traffic {
  width: 100%;
  margin: auto;
}
.center {
  width: 100%;
  text-align: center;
  color: $charcoal;
  font-size: 20px;
  margin-left: 50px;
  margin-bottom: 50px;
}
.add-link {
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
  button {
    background: $darkaccent;
    color: white;
    display: block;
    border-radius: 4px;
    padding: 8px;
  }
  a {
    color: $primary;
    font-size: 13px;
  }
}
.advert-link {
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(211, 211, 211, 0.442);
  padding: 10px;
  margin-bottom: 50px;
  &-head {
    display: flex;
    justify-content: flex-end;

    span {
      color: $lightaccent;
      cursor: pointer;
    }
  }
}

.half {
  display: flex;
  justify-content: space-between;
  width: 100% !important;
  .form-input {
    width: 100% !important;

    input,
    select,
    textarea {
      width: 98% !important;
    }

    input[type="radio"] {
      width: 50px !important;
      height: 50px;
    }
  }
}

.form {
  margin-top: 30px;
  &__container {
    padding: 16px 24px;
  }
}

.form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &:deep(.mx-datepicker) {
    height: 50px !important;
    width: 98%;
  }
  &:deep(.mx-input-wrapper) {
    height: 50px !important;
  }
  &:deep(.mx-input) {
    height: 50px !important;
  }

  label {
    font-size: 13px;
    color: $faint;
    font-weight: 400;
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    /*display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 6px 30px;
        padding-left: 10px;
        font-size: 15px;
        line-height: 1.4;
        color: $charcoal;
        background-color: #fff;
        //border: 1px solid #ccc;
        border: 2px solid rgba(211, 211, 211, 0.442);

        border-radius: 4px;

        

        outline-color: rgba(229, 231, 235)*/

    position: relative;
    cursor: text;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 16px;
    height: 48px;
    background-color: #fff;
    border: 1px solid #d6d6e7;
    border-radius: 3px;
    color: rgb(35, 38, 59);
    box-shadow: inset 0 1px 4px 0 rgb(227 160 158 / 20%);
    overflow: hidden;
    transition: all 100ms ease-in-out;
    :focus {
      border-color: #3c4fe0;
      box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
    }
  }

  textarea {
    height: 200px;
  }
}

.green {
  color: lightseagreen;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.steps {
  width: 100%;
  display: relative;

  /*
    &:after {
        content: "";
        position: absolute;
        width: 3px;
        background-color: #fff;
        top: 0;
        background: rgb(90 97 129 / 5%);
        border-radius: 6px;
        z-index: -1;
        bottom: 0;
        height: 100%;
        margin-top: 150px;;
    }*/

  &__step {
    margin-bottom: 20px;

    position: relative;
    cursor: pointer;
    min-height: 100px;
    border-radius: 5px;
    width: 100%;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; //padding: 16px;
    //padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //padding: 24px;
    margin-left: 50px;

    /*&:after {
                content: "";
                position: absolute;
                width: 6px;
                background-color: #fff;
                top: 0;
                left: -2px;
                background: #03ca6f;
                border-radius: 6px;
                z-index: -1;
            }*/

    &__body {
      padding-bottom: 24px;
    }
    &__header {
      color: $charcoal;
      font-weight: 400;
      border-bottom: 1px solid rgba(26, 26, 26, 0.1) !important;
      //padding-bottom: 16px;
      &__container {
        padding: 24px;
      }
      span {
        color: $faint;
        font-weight: 300;
        font-size: 12px !important;
      }
    }

    .step-card {
    }
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
      font-size: 14px;
      font-weight: 400;
    }

    input:checked + .radio-indicator {
      background: $primary;
    }
  }
}

.images {
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  margin-bottom: 30px;
  justify-content: space-between;
  // border: 1px solid grey;
  //min-height: 200px;
  // min-height: 200px;

  .image {
    //border: 1px solid grey;
    height: 100%;
    position: relative;
    width: auto;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    //margin-bottom: 40px;
  }
  .image-remove {
    width: 20px;
    height: 20px;
    background: rgb(211, 211, 211);
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    z-index: 100;
  }
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    // height: 100%;
    width: auto;
    height: 100%;
    object-fit: cover;
  }
}
.image-loading {
  filter: grayscale(1);
}
.form-input-file {
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
</style> 