<template>
  <div class="page">
    <template v-if="show_modal">
      <div class="modal">
        <div class="modal__mask" @click="closeModal">
          <div class="modal__container" @click.stop>
            <div class="modal__header">
              <div class="modal__header__container">
                <p class="modal__header__text">Join the waitlist</p>
              </div>
            </div>
            <div class="modal__body">
              <p>{{daysUntilLaunch }} days until launch</p>
              <div class="waitlist__caption section-body" v-if="!addedToWaitList">
                <!---<p>Launching in 26 days...</p>-->
                <p>Enter your email address to be notified immediately we launch</p>
                <input v-model="waitlist.email" type="text" placeholder="Your email address" />
                <button :disabled="loading" @click="addToWaitlist">Notify me!</button>
              </div>

              <div class="waitlist__body" v-if="addedToWaitList">
                <p
                  class="waitlist__header section-title"
                >Thank you for joining the waitlist. We'll notify you when we launch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="main">
      <div class="background-top">
        <img src="../static/background-top.png" alt />
      </div>
      <div class="background-top-illustration">
        <img src="../static/background-top-illustration.svg" alt />
      </div>
      <div class="background-bottom">
        <img src="../static/background-bottom.png" alt />
      </div>
      <div class="header">
        <div class="logo">
          <img src="../static/logo.svg" />
        </div>

        <div class="links">
          <a class="links__link">Home</a>
          <a class="links__link">Contact</a>
          <a class="links__link">Blog</a>
          <a class="links__link links__link--button" @click="show_modal = true">Get Started</a>
        </div>
      </div>

      <div class="content">
        <h1>THE PERFORMANCE MARKETING NETWORK</h1>
        <p>
          We connect brands with partner marketers:
          <span
            class="bold"
          >content creators, influencers and micro-influencers</span> with an audience in Africa.
        </p>
        <!--
                <p>As a <span class="red">business</span>, you'll reach a wider audience, generate traffic, acquire leads and boost sales.</p>
                <p>As a <span class="orange">marketer,</span> you get paid for bringing in those results.</p>
        --->

        <div class="content__flex">
          <button @click="scrollToHow('business')">Continue as a Business</button>
          <button @click="scrollToHow('marketer')">Earn as an Individual</button>
        </div>
      </div>
    </div>

    <template v-if="mode === 'business'">
      <div class="business">
        <div class="features" id="features">
          <div class="features__container">
            <div class="features__header">
              <p class="features__header__head header-head">features</p>
              <p class="features__header__title header-title">What We Offer</p>
            </div>

            <div class="features__content">
              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image">
                    <svg
                      width="88"
                      height="88"
                      viewBox="0 0 88 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_46_27)">
                        <circle cx="44" cy="40" r="40" fill="$secondary" fill-opacity="0.15" />
                      </g>
                      <rect
                        x="20"
                        y="26"
                        width="49"
                        height="26"
                        stroke="$secondary"
                        stroke-opacity="0.5"
                        stroke-width="2"
                      />
                      <rect
                        x="43"
                        y="53"
                        width="2"
                        height="7"
                        fill="$secondary"
                        fill-opacity="0.5"
                      />
                      <g filter="url(#filter1_d_46_27)">
                        <rect
                          x="38"
                          y="60"
                          width="12"
                          height="2"
                          fill="$secondary"
                          fill-opacity="0.5"
                          shape-rendering="crispEdges"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_46_27"
                          x="0"
                          y="0"
                          width="88"
                          height="88"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_46_27"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_46_27"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_46_27"
                          x="34"
                          y="60"
                          width="20"
                          height="10"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_46_27"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_46_27"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">A PLATFORM</p>
                  <p
                    class="features__item__caption"
                  >Digitize your marketing campaigns with access to thousands of willing marketers.</p>
                </div>
              </div>
              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image">
                    <svg
                      width="88"
                      height="88"
                      viewBox="0 0 88 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_28_32)">
                        <rect
                          x="4"
                          width="80"
                          height="80"
                          rx="20"
                          fill="#205EFF"
                          fill-opacity="0.15"
                        />
                        <path d="M24 16H29V59H24V16Z" fill="#205EFF" fill-opacity="0.5" />
                        <path d="M36 37H41V59H36V37Z" fill="#205EFF" fill-opacity="0.5" />
                        <path d="M47 31H52V59H47V31Z" fill="#205EFF" fill-opacity="0.5" />
                        <path d="M59 20H64V59H59V20Z" fill="#205EFF" fill-opacity="0.5" />
                        <path
                          d="M18.9136 65C18.9136 66.4728 20.1075 67.6667 21.5803 67.6667C23.053 67.6667 24.2469 66.4728 24.2469 65C24.2469 63.5272 23.053 62.3333 21.5803 62.3333C20.1075 62.3333 18.9136 63.5272 18.9136 65ZM69.3536 65.3536C69.5488 65.1583 69.5488 64.8417 69.3536 64.6464L66.1716 61.4645C65.9763 61.2692 65.6597 61.2692 65.4645 61.4645C65.2692 61.6597 65.2692 61.9763 65.4645 62.1716L68.2929 65L65.4645 67.8284C65.2692 68.0237 65.2692 68.3403 65.4645 68.5355C65.6597 68.7308 65.9763 68.7308 66.1716 68.5355L69.3536 65.3536ZM21.5803 64.5H20V65.5H21.5803V64.5ZM20 65.5L69 65.5V64.5L20 64.5V65.5Z"
                          fill="#205EFF"
                          fill-opacity="0.5"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_28_32"
                          x="0"
                          y="0"
                          width="88"
                          height="88"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_28_32"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_28_32"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">TRACKING & ANALYTICS</p>
                  <p
                    class="features__item__caption"
                  >Track progress. Get insights into campaign performance and costumer behaviour via real-time analytics tools</p>
                </div>
              </div>
              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image" style="margin-top: -10px;">
                    <svg
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_52_40)">
                        <path
                          d="M35.3415 18.525C42.5813 10.1855 55.2102 9.29241 63.5516 16.53L85.2138 35.3258C93.5583 42.5661 94.4518 55.2006 87.2093 63.5433L68.4079 85.2005C61.1681 93.5401 48.5392 94.4332 40.1978 87.1955L18.5356 68.3998C10.1911 61.1595 9.29761 48.5249 16.5401 40.1823L35.3415 18.525Z"
                          fill="#00AAFF"
                          fill-opacity="0.15"
                          shape-rendering="crispEdges"
                        />
                      </g>
                      <path
                        d="M31.1667 33.1666H34.7917C37.0417 33.1666 38.8125 35.1041 38.625 37.3333L36.8958 58.0833C36.6042 61.4791 39.2916 64.3958 42.7083 64.3958H64.8958C67.8958 64.3958 70.5208 61.9375 70.75 58.9583L71.875 43.3333C72.125 39.875 69.5 37.0624 66.0208 37.0624H39.125"
                        stroke="#00AAFF"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M60.8542 74.8333C62.2924 74.8333 63.4583 73.6673 63.4583 72.2291C63.4583 70.7909 62.2924 69.6249 60.8542 69.6249C59.4159 69.6249 58.25 70.7909 58.25 72.2291C58.25 73.6673 59.4159 74.8333 60.8542 74.8333Z"
                        stroke="#00AAFF"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M44.1875 74.8333C45.6257 74.8333 46.7917 73.6673 46.7917 72.2291C46.7917 70.7909 45.6257 69.6249 44.1875 69.6249C42.7493 69.6249 41.5833 70.7909 41.5833 72.2291C41.5833 73.6673 42.7493 74.8333 44.1875 74.8333Z"
                        stroke="#00AAFF"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M45.75 45.6666H70.75"
                        stroke="#00AAFF"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <filter
                          id="filter0_d_52_40"
                          x="7.6426"
                          y="11.636"
                          width="88.4642"
                          height="88.4536"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_52_40"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_52_40"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">E-Commerce Tools</p>
                  <p
                    class="features__item__caption"
                  >Hosted Forms, Payment and Sales Pages - everything you need to sell your product without a website</p>
                </div>
              </div>

              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image">
                    <svg
                      width="88"
                      height="88"
                      viewBox="0 0 88 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_37_176)">
                        <rect
                          x="4"
                          width="80"
                          height="80"
                          rx="20"
                          fill="#2CADAD"
                          fill-opacity="0.15"
                        />
                        <path
                          d="M47.1042 21.0834L59.3958 26.5417C62.9375 28.1042 62.9375 30.6875 59.3958 32.25L47.1042 37.7084C45.7084 38.3334 43.4167 38.3334 42.0209 37.7084L29.7292 32.25C26.1875 30.6875 26.1875 28.1042 29.7292 26.5417L42.0209 21.0834C43.4167 20.4584 45.7084 20.4584 47.1042 21.0834Z"
                          stroke="#2CADAD"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M26.25 37.9167C26.25 39.6667 27.5625 41.6875 29.1667 42.3959L43.3125 48.6875C44.3958 49.1667 45.625 49.1667 46.6875 48.6875L60.8333 42.3959C62.4375 41.6875 63.75 39.6667 63.75 37.9167"
                          stroke="#2CADAD"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M26.25 48.3333C26.25 50.2708 27.3958 52.0208 29.1667 52.8125L43.3125 59.1041C44.3958 59.5833 45.625 59.5833 46.6875 59.1041L60.8333 52.8125C62.6042 52.0208 63.75 50.2708 63.75 48.3333"
                          stroke="#2CADAD"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_37_176"
                          x="0"
                          y="0"
                          width="88"
                          height="88"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_37_176"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_37_176"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">SDKs</p>
                  <p
                    class="features__item__caption"
                  >Software Development Kit to launch reward programs on your existing platform.</p>
                </div>
              </div>
              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image" style="margin-top: -10px">
                    <svg
                      width="104"
                      height="104"
                      viewBox="0 0 104 104"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_46_36)">
                        <path
                          d="M35.3415 18.5252C42.5813 10.1856 55.2102 9.29254 63.5516 16.5302L85.2138 35.3259C93.5583 42.5662 94.4518 55.2008 87.2093 63.5434L68.4079 85.2007C61.1681 93.5402 48.5392 94.4333 40.1978 87.1957L18.5356 68.3999C10.1911 61.1597 9.29761 48.5251 16.5401 40.1825L35.3415 18.5252Z"
                          fill="#37474F"
                          fill-opacity="0.3"
                          shape-rendering="crispEdges"
                        />
                      </g>
                      <rect
                        x="33.5"
                        y="40.5"
                        width="38"
                        height="22"
                        rx="2.5"
                        fill="#37474F"
                        stroke="#37474F"
                      />
                      <rect x="33" y="43" width="39" height="5" fill="#E1E1E1" />
                      <circle cx="65" cy="58" r="2" fill="#E1E1E1" />
                      <circle cx="67" cy="58" r="2" fill="#E1E1E1" />
                      <defs>
                        <filter
                          id="filter0_d_46_36"
                          x="7.64261"
                          y="11.6361"
                          width="88.4642"
                          height="88.4536"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_46_36"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_46_36"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">INTEGRATED PAYMENTS</p>
                  <p
                    class="features__item__caption"
                  >Collect payment and withdraw money earned from campaigns.</p>
                </div>
              </div>
              <div class="features__item enter-right">
                <div class="features__item__container">
                  <div class="features__item__image">
                    <svg
                      width="88"
                      height="88"
                      viewBox="0 0 88 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_51_7)">
                        <circle cx="44" cy="40" r="40" fill="#FDFDFD" />
                        <circle cx="44" cy="40" r="35" stroke="#FF8D8D" stroke-width="10" />
                      </g>
                      <g filter="url(#filter1_d_51_7)">
                        <path
                          d="M68.4478 9.44742C70.4479 7.54346 73.5052 7.7174 75.2765 9.83592V9.83592C77.0477 11.9544 76.8622 15.2153 74.8621 17.1193L17.7064 71.5274C15.7063 73.4313 12.649 73.2574 10.8777 71.1389V71.1389C9.10647 69.0203 9.29199 65.7595 11.2921 63.8555L68.4478 9.44742Z"
                          fill="#FF8D8D"
                        />
                      </g>
                      <g filter="url(#filter2_d_51_7)">
                        <path
                          d="M8.03434 21.0154C5.80624 19.3841 5.43593 16.3443 7.20725 14.2259V14.2259C8.97856 12.1074 12.2207 11.7125 14.4488 13.3437L78.1198 59.9594C80.3479 61.5907 80.7182 64.6304 78.9469 66.7489V66.7489C77.1756 68.8674 73.9334 69.2623 71.7053 67.631L8.03434 21.0154Z"
                          fill="#FF8D8D"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_51_7"
                          x="0"
                          y="0"
                          width="88"
                          height="88"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_51_7"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_51_7"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_51_7"
                          x="5.66171"
                          y="8.12585"
                          width="74.8307"
                          height="72.7231"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_51_7"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_51_7"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_51_7"
                          x="2.08752"
                          y="12.3381"
                          width="81.9791"
                          height="64.2986"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_51_7"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_51_7"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p class="features__item__title">FRAUD PREVENTION</p>
                  <p
                    class="features__item__caption"
                  >Our system detects and prevents fraudlent behaviour to ensure integrity of results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sample">
          <div class="sample__container">
            <p class="sample__header header-title">Do You Need Afflee?</p>
            <p class="sample__caption header-head">Example Use-Cases</p>

            <div class="sample__group">
              <div class="sample__item enter-right" v-for="sample in samples" :key="sample.title">
                <p class="sample__item__title">{{sample.title}}</p>
                <p class="sample__item__caption">{{sample.caption}}</p>
              </div>
            </div>

            <p class="on-and-on">The list goes on and on...</p>

            <button @click="show_modal = true">Sign up for free!</button>
          </div>
        </div>
        <div class="how">
          <div class="how__container">
            <div class="how__header">
              <p class="how__header__head header-head">THE PROCESS</p>
              <p class="how__header__title header-title">How it works</p>
              <div class="how__layer">
                <div class="how__item">
                  <div class="how__item__image">
                    <img src="../static/process-create-campaign1.png" alt />
                    <div class>
                      <p class="how__item__head">Create a marketing campaign</p>
                      <p
                        class="how__item__caption"
                      >A campaign is a bundle for the product or service that you're trying to advertise or sell.</p>
                    </div>
                  </div>
                </div>
                <div class="how__item">
                  <div class="how__item__image">
                    <img src="../static/process-choose1.png" alt />
                    <div class>
                      <p class="how__item__head">Choose payment model</p>
                      <p
                        class="how__item__caption"
                      >Choose how marketers get paid. Pay-per-click, pay-per-lead, pay-per-sale -- depends on your objective</p>
                    </div>
                  </div>
                </div>
                <div class="how__item">
                  <div class="how__item__image">
                    <img src="../static/process-choose-marketers.png" alt />
                    <div class>
                      <p class="how__item__head">Connect with marketers</p>
                      <p
                        class="how__item__caption"
                      >You can choose to make your campaign public, invite marketers or accept applications</p>
                    </div>
                  </div>
                </div>
                <div class="how__item">
                  <div class="how__item__image">
                    <img src="../static/process-track-progress.png" alt />
                    <div class>
                      <p class="how__item__head">Track your performance</p>
                      <p
                        class="how__item__caption"
                      >View insights to show how well your campaigns are faring.</p>
                    </div>
                  </div>
                </div>
                <div class="how__item">
                  <div class="how__item__image">
                    <img src="../static/process-pay.png" alt />
                    <div class>
                      <p class="how__item__head">Pay for results</p>
                      <p
                        class="how__item__caption"
                      >Pay marketers pre-defined amounts of money based on the payment model and for only bringing in results.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="how__cta">
                <button @click="show_modal = true">Launch your campaign in 2 steps!</button>
              </div>
            </div>
          </div>
        </div>

        <div class="why">
          <div class="why__container">
            <p class="why__head">Widen your reach while paying for results only</p>
            <p class="why__caption">It's free to sign up and host campaigns. No commitments</p>

            <div class="why__group">
              <div class="why__item">
                <div class="svg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="9.5" stroke="$secondary" />
                    <circle cx="10" cy="10" r="5.5" fill="$secondary" stroke="$secondary" />
                  </svg>
                </div>

                <p>You don't have to pay a lump sum to only a select few people</p>
              </div>

              <div class="why__item">
                <div class="svg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="9.5" stroke="$secondary" />
                    <circle cx="10" cy="10" r="5.5" fill="$secondary" stroke="$secondary" />
                  </svg>
                </div>

                <p>Best way to track influencer/partner success.</p>
              </div>

              <div class="why__item">
                <div class="svg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="9.5" stroke="$secondary" />
                    <circle cx="10" cy="10" r="5.5" fill="$secondary" stroke="$secondary" />
                  </svg>
                </div>

                <p>Test to see if this path works well for your progress</p>
              </div>

              <div class="why__item">
                <div class="svg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="9.5" stroke="$secondary" />
                    <circle cx="10" cy="10" r="5.5" fill="$secondary" stroke="$secondary" />
                  </svg>
                </div>

                <p>Pull your budget out of the platform at anytime. Again, no commitments.</p>
              </div>

              <button @click="show_modal = true">Get Started For Free</button>
            </div>
          </div>
        </div>

        <div class="faq">
          <div class="faq__container">
            <p class="header-title">Frequently Asked Questions</p>
            <div class="faq__content">
              <div class="faq__item" v-for="(f, index) in faqs" :key="index">
                <div class="faq__question">
                  <p>{{f.question}}</p>

                  <p>{{f.answer}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer section">
        <p>Ⓒ 2022 Afflee Inc. All rights served</p>
      </div>
    </template>

    <template v-if="mode === 'marketer'">
      <div class="section" id="section-1">
        <div class="section__container">
          <div class="section__flex">
            <div class="section__image enter-right desktop-show">
              <img src="../static/girl-smiling.png" alt />
            </div>
            <div class="section__content enter-left">
              <p class="section__header header-title">Monetize your social media following</p>
              <div class="section__image enter-right mobile-show">
                <img src="../static/girl-smiling.png" alt />
              </div>
              <p
                class="section__caption section__caption--padded"
              >Join thousands of African social media content creators in getting deals from high-value, legitimate businesses to advertise products and services.</p>
              <button style="margin-top: 44px" @click="addToWaitlist">Join the watlist</button>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section__container">
          <div class="section__flex">
            <div class="section__content enter-left">
              <p class="section__header header-title">No more "DM for promotions"</p>
              <div class="section__image enter-right mobile-show">
                <img src="../static/influencer.png" alt />
              </div>
              <p
                class="section__caption section__caption--padded"
              >Don't wait for businesses to reach out to you. Join their marketing campaigns on Afflee</p>
              <button style="margin-top: 44px">Get Started</button>
            </div>

            <div class="section__image enter-right desktop-show">
              <img src="../static/influencer.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="how">
        <div class="how__container">
          <div class="how__header">
            <p class="how__header__head header-head">THE PROCESS</p>
            <p class="how__header__title header-title">How it works</p>
            <div class="how__layer enter-right">
              <div class="how__item">
                <div class="how__item__image">
                  <img src="../static/signup.png" alt />
                  <div class>
                    <p class="how__item__head">Sign up</p>
                    <p
                      class="how__item__caption"
                    >Register for free as a content creator, thought leader or independent marketer</p>
                  </div>
                </div>
              </div>
              <div class="how__item">
                <div class="how__item__image">
                  <img src="../static/join-marketing-campaign.png" alt />
                  <div class>
                    <p class="how__item__head">Browse and join marketing campaigns</p>
                    <p
                      class="how__item__caption"
                    >We host and curate marketing campaigns from legitimate, high-value businesses that sell to Africans</p>
                  </div>
                </div>
              </div>
              <div class="how__item">
                <div class="how__item__image">
                  <img src="../static/share-campaign.png" alt />
                  <div class>
                    <p class="how__item__head">Advertise!</p>
                    <p
                      class="how__item__caption"
                    >Share adverts with your customized links on the internet and social media to earn cash rewards</p>
                  </div>
                </div>
              </div>
              <div class="how__item">
                <div class="how__item__image">
                  <img src="../static/process-track-progress.png" alt />
                  <div class>
                    <p class="how__item__head">Track your performance</p>
                    <p
                      class="how__item__caption"
                    >View insights to show how well you're adverts are doing.</p>
                  </div>
                </div>
              </div>
              <div class="how__item">
                <div class="how__item__image">
                  <img src="../static/process-pay.png" alt />
                  <div class>
                    <p class="how__item__head">Get paid</p>
                    <p
                      class="how__item__caption"
                    >You automatically get paid per sale, per lead or per click -- depending on the marketing campaign</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="how__cta">
              <button @click="show_modal = true">Sign up for free and start earning!</button>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section__container">
          <div class="section__flex">
            <div class="section__image enter-left desktop-show">
              <img src="../static/top1.png" alt />
            </div>
            <div class="section__content enter-right">
              <p
                class="section__header header-title"
              >You don't have to be in the top 1% of influencers.</p>
              <div class="section__image enter-left mobile-show">
                <img src="../static/top1.png" alt />
              </div>
              <p class="section__caption section__caption--padded">
                If you have an audience that trusts your judgement, you can earn a living pushing products and services listed on Afflee.
                And it's completely free to signup.
              </p>
              <button @click="addToWaitlist" style="margin-top: 44px">Join the watlist</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer section">
        <p>Ⓒ 2022 Afflee Inc. All rights served</p>
      </div>
    </template>
  </div>
</template>

<script>
import moment from "moment";

if (process.browser) {
  window.addEventListener("load", function() {
    console.log("loaded");
    function elementIsInView(el, percentageScroll = 100) {
      const elementTop = el.getBoundingClientRect().top;
      console.log(elementTop);

      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) *
          (percentageScroll / 100)
      );
    }

    function handleScrollAnimation(el) {
      const enterLeftElements = document.getElementsByClassName("enter-left");
      const enterRightElements = document.getElementsByClassName("enter-right");
      const enterUpElements = document.getElementsByClassName("enter-up");
      const enterDownElements = document.getElementsByClassName("enter-down");

      for (let i = 0; i < enterLeftElements.length; i++) {
        const el = enterLeftElements[i];
        if (elementIsInView(el, 100)) {
          el.classList.add("enter");
        }
      }
      for (let i = 0; i < enterRightElements.length; i++) {
        const el = enterRightElements[i];
        if (elementIsInView(el, 100)) {
          el.classList.add("enter");
        }
      }

      /*
			enterRightElements.forEach(el => {
				if (elementIsInView(el, 100)) {
					el.classList.add('enter');
				}
			});
		
			enterDownElements.forEach(el => {
				if (elementIsInView(el, 100)) {
					el.classList.add('enter');
				}
			});
	
			enterUpElements.forEach(el => {
				if (elementIsInView(el, 100)) {
					el.classList.add('enter');
				}
			});*/
    }

    window.addEventListener("scroll", () => {
      handleScrollAnimation();
    });
  });
}

export default {
  head() {
    return {
      title: "Afflee | Africa's No.1 Influencer Marketing Platform",
      meta: [
        {
          hid: "description",
          name: "descripton",
          content:
            "We connect businesses with influencers, micro-influencers and content creators to push their campaigns"
        }
      ] // hid is used as unique identifier. Do not use `vmid` for it as it will not work
    };
  },
  data() {
    return {
      waitlist: {
        email: "",
        type: this.mode
      },
      loading: false,
      addedToWaitList: false,
      show_modal: false,
      mode: "",
      samples: [
        {
          title: "Product launch",
          caption: `Create awareness for your newly launched product.  
                        A pay-per-click campaign can earn you lots of traffic`
        },
        {
          title: "Promotion and Sales Offers",
          caption: "You need people to share your new offers on social media."
        },
        {
          title: "Attracting clients to your service business",
          caption: `You want to attract clients and need them to pay a consultation fee from which you'll automatically pay marketers `
        },
        {
          title: "Real Estate Offers",
          caption:
            "Set up a payment page for people interested in checking out a new real-estate offer"
        },
        {
          title: "Selling Digital Courses",
          caption:
            "Host your digital courses to have them promoted and sold while automatically paying commission."
        }
      ],

      faqs: [
        {
          question: "Q: Is Afflee free to use?",
          answer:
            "It's completely free to signup, create campaigns, view analytics, among other things. You pay for only derived results, sponsored campaigns and for using Afflee's e-commerce hosting tools."
        },
        {
          question: "Q: How does Afflee control the quality of marketers?",
          answer:
            "We aren't opinionated. You choose whether to make your campaigns public, to invite marketers or to receive applications. We  provide tools to ensure that you seamlessly go through applications."
        },
        {
          question:
            "Q: How does Afflee ensure that marketers aren't gaming the system?",
          answer:
            "Our systems are smart enough to recognize inconsistencies such as duplicate visits or leads from the same IP address, VPN use, and so on."
        },
        {
          question:
            "Q: Can I block an existing marketer from promoting my campaign?",
          answer: "You have exclusive control to manage your campaigns."
        }
      ]
    };
  },
  computed: {
    daysUntilLaunch() {
      const days = moment("2023-01-01").diff(moment(), "days");
      return days;
    }
  },
  watch: {
    mode(value) {
      setTimeout(function() {}, 200);
    }
  },
  methods: {
    scrollToHow(type) {
      this.mode = type;
      setTimeout(() => {
        if (type === "business") {
          document.querySelector("#features").scrollIntoView({
            behavior: "smooth"
          });
        } else {
          document.querySelector("#section-1").scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 200);
    },
    addToWaitlist() {
      this.loading = true;
      this.$http
        .$post(
          "https://stagingaffleebackend.herokuapp.com/api/v1/waitlist",
          this.waitlist
        )
        .then(resp => {
          this.loading = false;
          this.addedToWaitList = true;
        });
    },
    changeMode(mode) {
      this.mode = mode;
    },
    closeModal() {
      this.show_modal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #de5c6e;
$charcoal: #36454f;
$fainttext: rgb(85, 83, 83);
$secondary: darkgrey;

$main-break: 1045px;

* {
  font-family: "Quicksand", sans-serif;
}

.desktop-show {
  display: block;
  @media screen and (max-width: 583px) {
    display: none;
  }
}
.mobile-show {
  display: none;
  @media screen and (max-width: 583px) {
    display: block;
    width: 100% !important;
  }
}

.footer {
  background-color: #de5c6e;
  text-align: center;
  color: white;
  bottom: 0;
  padding: 120px 0;
}

button {
  border-radius: 10px !important;
  width: 48%;
  display: block;
  background: #de5c6e;
  color: white;
  padding: 16px;
  font-size: 20px;

  @media screen and (max-width: 769px) {
    width: 100%;
  }
  &:hover {
    animation: pulse 1s;
    box-shadow: 0 0 0 2em transparent;
  }
}
.business {
  // margin: auto;
  position: relative;

  .features {
    // business
    position: relative;
    z-index: 333;
    //background: url('../how-background.png') no-repeat right center;
    &__container {
      padding: 160px 0;
      padding-bottom: 72px;
      width: 80%;
      z-index: 333;

      margin: auto;

      @media screen and (max-width: $main-break) {
        max-width: 90%;
      }
    }
    &__header {
      &__head {
        text-align: center;
      }
      &__title {
        text-align: center;
      }
    }
    &__content {
      z-index: 333;

      display: flex;
      margin-top: 50px;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    &__item {
      z-index: 333;

      width: 29%;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
      margin-bottom: 36px;
      border-radius: 5px;
      border: 1px solid rgba(75, 75, 75, 0.074);
      @media screen and (max-width: $main-break) {
        width: 45%;
      }

      @media screen and (max-width: 769px) {
        width: 100%;
      }

      &__container {
        padding: 25px 24px;
      }
      &__image {
        //background: grey;
        //height: 80px;
        // width: 80px;
        width: 70px;
        height: 70px;
        margin-right: auto;
        margin-left: auto;
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
      }
      &__title {
        text-align: center;
        text-transform: uppercase;
        color: black;
        font-size: 18px;
        font-weight: 700;
      }
      &__caption {
        font-weight: 400;
        margin-top: 15px;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
        color: $charcoal;
      }
    }
  }
}

.header-head {
  text-transform: uppercase;
  color: $primary;
  font-size: 18px;
  font-weight: 700;
}

.header-title {
  color: black;
  font-size: 35px;
  font-weight: 400;

  @media screen and (max-width: $main-break) {
    font-size: 30px;
  }
}

.features-background {
  position: absolute;
  right: 0;
  top: 25%;
  z-index: -1;
}

.bold {
  font-weight: 700;
}
.red {
  color: #de5c6e;
  font-weight: 500;
}
.orange {
  color: $secondary;
  font-weight: 500;
}
.main {
  height: 100vh;
  position: relative;
  background: white;

  @media screen and (max-width: $main-break) {
    height: auto;
    margin-bottom: 50px;
  }
}
.background-top {
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
}
.background-bottom {
  position: absolute;
  bottom: -250px;
  left: 0;
}
.on-and-on {
  color: $fainttext;
  font-size: 25px;
  margin-top: 50px;
  text-align: center;
  @media screen and (max-width: $main-break) {
    font-size: 20px;
  }
}
.background-top-illustration {
  @media screen and (max-width: $main-break) {
    display: none;
  }
  img {
    position: absolute;
    top: 100px;
    right: 0;
    width: 650px;
    height: 650px;
  }
}
.header {
  width: 80%;
  margin: auto;
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;

  .logo {
    max-width: 150px;
  }

  .links {
    &__link {
      cursor: pointer;
      color: black;
      font-size: 20px;
      margin-right: 16px;

      @media screen and (max-width: 769px) {
        display: none;
      }

      &--button {
        background: #de5c6e;
        //text-transform: uppercase;
        padding: 16px 36px;
        text-align: center;
        border-radius: 50px;
        color: white;
        font-weight: 700;

        @media screen and (max-width: 769px) {
          padding: 8px 10px;
        }
      }
    }
  }
}

.content {
  width: 80%;
  margin: auto;

  @media screen and (max-width: $main-break) {
    width: 90%;
  }

  h1 {
    font-size: 50px;
    max-width: 50%;
    margin-top: 100px;
    margin-bottom: 25px;

    font-weight: 700;

    @media screen and (max-width: $main-break) {
      max-width: 100%;
    }

    @media screen and (max-width: 769px) {
      margin-top: 50px;
      font-size: 30px;
    }
  }
  p {
    font-size: 20px;
    max-width: 40%;
    margin-top: 25px;
    //text-align: justify;
    color: $charcoal;

    @media screen and (max-width: $main-break) {
      max-width: 100%;
    }
    @media screen and (max-width: 769px) {
      font-size: 18px;
    }
  }

  &__flex {
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-top: 70px;

    @media screen and (max-width: $main-break) {
      width: 100%;
    }

    @media screen and (max-width: 769px) {
      width: 100%;
      flex-direction: column;
    }

    button {
      border-radius: 50px;
      width: 48%;

      background: #de5c6e;
      color: white;
      padding: 16px;
      font-size: 20px;

      @media screen and (max-width: 769px) {
        width: 100%;
        margin-bottom: 20px;
      }

      &:hover {
        animation: pulse 1s;
        box-shadow: 0 0 0 2em transparent;
      }
      &:last-of-type {
        border: 2px solid $primary;
        background: transparent;
        color: $primary;
        &:hover {
          animation: orangepulse 1s;
          box-shadow: 0 0 0 2em transparent;
        }
      }
      &:disabled {
        background: lightgrey;
        border: none;
        color: white;
        &:hover {
          animation: none;
          box-shadow: none;
        }
      }
    }
  }
}

.how {
  &__container {
    margin: auto;
    width: 80%;
    padding: 72px 0px;
    display: flex;
    flex-wrap: nowrap;
    @media screen and (max-width: $main-break) {
      width: 90%;
      padding: 50px 0px;
    }
  }
  &__layer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &--left {
      justify-content: flex-start;
    }
    &--center {
      justify-content: center;
    }
    &--right {
      justify-content: flex-end;
    }
  }
  &__item {
    width: 30%;
    height: auto;
    @media screen and (max-width: $main-break) {
      width: 45%;
    }
    @media screen and (max-width: 769px) {
      width: 100%;
    }
    &__image {
      // width: 300px;
      //max-height: 300px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &__head {
      text-align: center;
      font-weight: 700;
      font-size: 24px;
    }
    &__caption {
      font-size: 16px;
      //font-weight: 300;
      text-align: center;
      color: $charcoal;

      @media screen and (max-width: $main-break) {
        margin-bottom: 50px;
      }
    }
  }
  &__cta {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
    margin: 60px auto 0 auto;
    button {
      // max-width: 300px;;
      //border-radius: 10px;
      @media screen and (max-width: 520px) {
        width: 100%;
      }
    }
  }
}

.why {
  margin-top: 150px;
  background: rgba(173, 216, 230, 0.158);
  @media screen and (max-width: $main-break) {
    margin-top: 72px;
  }
  button {
    margin-top: 50px;
    border-radius: 50px;
    width: 48%;
    background: $secondary;
    color: white;
    padding: 16px;
    font-size: 20px;
    @media screen and (max-width: 769px) {
      width: 70%;
    }
    &:hover {
      animation: orangepulse 1s;
      box-shadow: 0 0 0 2em transparent;
    }
  }

  &__head {
    text-align: center;
    font-size: 30px;
    font-weight: 700;

    @media screen and (max-width: $main-break) {
      margin-bottom: 20px;
    }
  }
  &__caption {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
  }
  &__container {
    padding: 120px 0;
    width: 80%;
    margin: auto;
  }
  &__group {
    display: flex;
    margin-top: 25px;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 70%;
    margin: auto;
    margin-top: 50px;

    @media screen and (max-width: $main-break) {
      width: 100%;
    }
  }
  &__item {
    display: flex;
    width: 45%;
    align-items: flex-start;
    @media screen and (max-width: $main-break) {
      width: 100%;
    }

    //justify-content: center;
    margin-bottom: 15px;
    svg {
      margin-top: 5px;
      margin-right: 10px;
    }
    p {
      font-size: 17px;
      font-weight: 300;
    }
  }
}

.sample {
  background: rgba(154, 178, 182, 0.0666666667);
  .header-head {
    text-align: center;
    margin-top: 50px;

    @media screen and (max-width: $main-break) {
      margin-top: 10px;
    }
  }

  .header-title {
    text-align: center;
  }
  &__container {
    width: 80%;
    margin: auto;
    padding: 120px 0;
    @media screen and (max-width: $main-break) {
      width: 90%;
      padding: 50px 0;
    }
  }

  &__group {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    @media screen and (max-width: $main-break) {
      flex-wrap: wrap;
    }
  }

  button {
    margin: auto;
    width: 50%;
    margin: auto;
    margin-top: 30px;
    display: block;
    background: transparent;
    border: 1px solid $primary;
    color: $primary;
    @media screen and (max-width: 750px) {
      width: 70%;
    }
  }

  &__item {
    border: 1px solid rgba(128, 128, 128, 0.31);
    padding: 16px;
    background: white;
    margin-right: 30px;
    margin-top: 20px;
    //background: white;
    border-radius: 5px;
    max-height: 300px;
    overflow: hidden;

    width: 40%;

    @media screen and (max-width: $main-break) {
      width: 45%;
      margin-right: 0;
    }
    @media screen and (max-width: 769px) {
      width: 100%;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
    }
    &__caption {
      font-size: 16px;
      //ext-align: justify;
      font-weight: 300;
      color: $charcoal;
    }
  }
}

.faq {
  background: rgba(154, 178, 182, 0.0666666667);
  &__container {
    width: 80%;
    margin: auto;
    padding: 72px 0;
    @media screen and (max-width: $main-break) {
      width: 90%;
      padding: 50px;
    }
  }

  .header-title {
    text-align: center;
  }

  &__content {
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
    justify-content: space-between;
    // width: 100%;
    //border: 1px solid blue;
  }

  &__item {
    cursor: pointer;

    border-radius: 10px;
    width: 48%;
    margin-bottom: 20px;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

    //border: 1px solid $primary;

    @media screen and (max-width: $main-break) {
      width: 100%;
    }
  }

  &__question {
    p {
      &:first-child {
        font-weight: 700;
      }
      &:last-of-type {
        color: #36454f;
      }
    }
  }
}

.modal {
  z-index: 1000;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  &__mask {
    width: 100%;
    height: 100%;
    padding: 64px 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.612);
    overflow: scroll;
  }

  &__header {
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

    &__container {
      width: 95%;
      margin: auto;
      padding: 16px 0;
    }
    &__text {
      color: $fainttext;
      font-weight: 600;
      font-size: 30px;
      text-align: center;
      text-transform: uppercase;
    }
  }

  &__container {
    width: 80%;
    background: white;
    min-height: auto;
    margin: auto;
    //margin-top: 50px;
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    border-radius: 5px;
    padding: 20px;

    &--half {
      width: 50% !important;
    }

    &--quarter {
      width: 25% !important;
    }
  }

  &__body {
    width: 95%;
    margin: auto;
    padding: 16px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    color: $primary;
    font-size: 20px;

    p {
      &:last-of-type {
        color: $charcoal;
      }
    }

    .section-body {
      input {
        background-color: white;
        width: 70%;
        margin: 20px 0;
        border: 1px solid lightgrey;
        padding: 8px;
        color: $charcoal;
        border-radius: 5px;
        text-align: center;
      }
      button {
        margin: auto;
      }
    }
  }
}

.enter-left {
  transform: translateX(-100px);
  opacity: 0;
  transition: all 800ms ease-in;
}

.enter-left.enter {
  opacity: 1;
  transform: translateX(0px);
  ::after {
    z-index: 10000000;
  }
}
.enter-right {
  transform: translateX(100px);
  opacity: 0;
  transition: all 800ms ease-in;
}

.enter-right.enter {
  opacity: 1;
  transform: translateX(0px);
  ::after {
    z-index: 10000000;
  }
}

.enter-up {
  transform: translateY(-100px);
  opacity: 0;
  transition: all 800ms ease-in;
}

.enter-up.enter {
  opacity: 1;
  transform: translateY(0px);
  ::after {
    z-index: 10000000;
  }
}
.enter-down {
  transform: translateY(100px);
  opacity: 0;
  transition: all 800ms ease-in;
}

.enter-down.enter {
  opacity: 1;
  transform: translateY(0px);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 #e3a09e;
  }
}
@keyframes orangepulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 166, 0, 0.442);
  }
}

.section {
  margin-top: 80px;
  @media screen and (max-width: $main-break) {
    margin-top: 72px;
  }

  &__container {
    padding: 60px 0;
    width: 80%;
    margin: auto;

    @media screen and (max-width: 640px) {
      margin-top: 72px;
      width: 90%;
      margin: 72px auto 0 auto;
    }
  }

  &__header {
    border-left: 5px solid $primary;
    padding-left: 16px;
    display: block;
    padding: 8px 0px;
    padding-left: 16px;
  }

  &__caption {
    font-size: 18px;
    margin-top: 8px;
    font-weight: 300;
    color: #36454f;
    &--padded {
      width: 100%;
      padding-left: 16px;
    }
  }

  &__image {
    width: 50%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__content {
    width: 50%;
    @media screen and (max-width: 583px) {
      width: 90%;
      margin: auto;
    }
  }

  &__flex {
    display: flex;
    justify-content: space-between;
  }
}
</style>