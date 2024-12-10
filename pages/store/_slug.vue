<template>
    <div class="page">
        <!--<ShopCartModal @close="show_cart_modal = false" v-if="show_cart_modal && this.cart.length">

        </ShopCartModal>-->

        <OrderModal @close="focused_product = null" :item="focused_product"></OrderModal>

        <CartModal  @close="show_cart_modal = false"  v-if="show_cart_modal && this.cart.length" :business="business"></CartModal>
        
        <div class="page__container">
            <div class="sidebar" v-if="show_sidebar" @click="show_sidebar=false">
                <div class="sidebar__container" @click.stop>
                    <div class="sidebar__header">
                        <p>Anon</p>
                        <p>{{auth_customer.phone}}</p>
                    </div>

                    <div class="sidebar__body">
                        <div class="section-tite">
                            <p class="subscription-text">Subscriptions</p>
                        </div>
                        <div class="sidebar__business" @click="$router.push('/store/' + business.slug)" v-for="(business, index) in customer_businesses">
                            <img :src="business.logo">
                            <p>

                                {{ business.name }}
                            </p>
                        </div>
                    </div>
                </div>

                
            </div>

            <div class="main" v-if="business">
                <div class="header" :style="{'backgroundColor': styling?.primary_color? hexToRgba(styling.primary_color, 0.3) : '' }">
                    <div class="header__container">
                        <div class="logo">
                            <div class="logo__container">
                                
                                <img :src="business.logo">
                                <h1>{{business.name}}</h1>
                                
                            </div>
                        </div>

                        <div>
                            <button class="bookmark-btn" @click="followBusiness">Bookmark</button>
                        </div>

                        <div class="" @click="show_sidebar = true" v-if="auth_customer && auth_customer.id">
                            <div class="account" style="border-radius: 50%; height: 40px; width: 40px;">
                                <img src="https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1" alt="">

                            </div>
                        </div>
                    </div>
            </div>

                <div class="tabs" :style="{'backgroundColor': styling?.primary_color? hexToRgba(styling.primary_color, 0.3) : '' }">
                    <div class="tabs__container">
                        <div class="tabs__item" :class="[current_tab === tab.toLowerCase()?  'selected_tab': '']" @click="selectTab(tab)" v-for="(tab, index) in tabs" :key="index">
                            <p>{{tab}}</p>
                        </div>
                    </div>
                </div>

                <div v-if="false" class="header flex space-between padding-16 flex-center-y">
                    <div class="header__purchases">Purchases: 0</div>

                    <div class="header__wallet flex gap-2 flex-center-y">
                        <p> {{ "NGN" | currencySymbol }}0</p>
                        <button class="pay-button">Pay</button>
                    </div>
                </div>
                <div class="notifier flex gap-2 padding-16" v-if="false">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2.5L17.5 16.6667H2.5L10 2.5Z" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 8.33337V11.6667" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 14.1666V14.175" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                    <p>This store has archived 34 items available at the physical store.</p>
                </div>

                <div>

                    <div class="tabs" v-if="false">
                        
                        <div class="tab active-tab">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33333 4.99992V3.33325H16.6667V4.99992H3.33333ZM3.33333 16.6666V11.6666H2.5V9.99992L3.33333 5.83325H16.6667L17.5 9.99992V11.6666H16.6667V16.6666H15V11.6666H11.6667V16.6666H3.33333ZM5 14.9999H10V11.6666H5V14.9999ZM4.20833 9.99992H15.7917L15.2917 7.49992H4.70833L4.20833 9.99992Z" fill="white"/>
                                </svg>
                                
                            Bookmark this Store on PointsBud
                        </div>
    
                        <template>
    
                            <div class="tab">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5 12.5H10.625C11.3125 12.5 11.875 11.9375 11.875 11.25C11.875 10.5625 11.3125 10 10.625 10H9.375C8.6875 10 8.125 9.4375 8.125 8.75C8.125 8.0625 8.6875 7.5 9.375 7.5H12.5M10 5.625V7.08375M10 11.875V14.375M16.875 6.25V16.875H3.75M3.125 13.75V3.125H15" stroke="black" stroke-width="1.25" stroke-linejoin="round"/>
                                    </svg>
                                    
                                Deals
                            </div>
                            <div class="tab" v-if="false">Reservations</div>
                            <div class="tab">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 17.5C8.08333 17.5 6.41333 16.8647 4.99 15.5942C3.56667 14.3236 2.75056 12.7367 2.54167 10.8333H4.25C4.44444 12.2778 5.08694 13.4722 6.1775 14.4167C7.26806 15.3611 8.54222 15.8333 10 15.8333C11.625 15.8333 13.0036 15.2675 14.1358 14.1358C15.2681 13.0042 15.8339 11.6256 15.8333 10C15.8328 8.37444 15.2669 6.99611 14.1358 5.865C13.0047 4.73389 11.6261 4.16778 10 4.16667C9.04167 4.16667 8.14583 4.38889 7.3125 4.83333C6.47917 5.27778 5.77778 5.88889 5.20833 6.66667H7.5V8.33333H2.5V3.33333H4.16667V5.29167C4.875 4.40278 5.73972 3.71528 6.76083 3.22917C7.78194 2.74306 8.86167 2.5 10 2.5C11.0417 2.5 12.0175 2.69806 12.9275 3.09417C13.8375 3.49028 14.6292 4.02472 15.3025 4.6975C15.9758 5.37028 16.5106 6.16194 16.9067 7.0725C17.3028 7.98306 17.5006 8.95889 17.5 10C17.4994 11.0411 17.3017 12.0169 16.9067 12.9275C16.5117 13.8381 15.9769 14.6297 15.3025 15.3025C14.6281 15.9753 13.8364 16.51 12.9275 16.9067C12.0186 17.3033 11.0428 17.5011 10 17.5ZM12.3333 13.5L9.16667 10.3333V5.83333H10.8333V9.66667L13.5 12.3333L12.3333 13.5Z" fill="black"/>
                                    </svg>
                                    
                                Purchase History
                            </div>
    
                        </template>
                    </div>


                    <div style="position: sticky; top: 0; left: 0; background: white; z-index: 1">

                        <ShopCategoryNavigation v-if="current_tab === 'shop' " @changeCategory="changeCategory" :current_category="current_category" :categories="filteredCategories"></ShopCategoryNavigation>
                    </div>
                    
    

                    <template v-if="current_tab === 'shop'">

                            <div class="search" v-if="false">
                                <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.2375 16.7948L11.0192 11.5765C10.6025 11.9315 10.1233 12.2062 9.58167 12.4006C9.04001 12.5951 8.49556 12.6923 7.94834 12.6923C6.6139 12.6923 5.48445 12.2303 4.56001 11.3065C3.63556 10.3826 3.17334 9.2534 3.17334 7.91896C3.17334 6.58452 3.63501 5.45479 4.55834 4.52979C5.48167 3.60479 6.61056 3.14174 7.94501 3.14063C9.27945 3.13952 10.4095 3.60174 11.335 4.52729C12.2606 5.45285 12.7233 6.58257 12.7233 7.91646C12.7233 8.49535 12.6208 9.05563 12.4158 9.59729C12.2108 10.139 11.9414 10.6023 11.6075 10.9873L16.8258 16.2048L16.2375 16.7948ZM7.94917 11.8581C9.05473 11.8581 9.98806 11.4776 10.7492 10.7165C11.5103 9.95535 11.8908 9.02174 11.8908 7.91563C11.8908 6.80952 11.5103 5.87618 10.7492 5.11563C9.98806 4.35507 9.05473 3.97452 7.94917 3.97396C6.84362 3.9734 5.91001 4.35396 5.14834 5.11563C4.38667 5.87729 4.00612 6.81063 4.00667 7.91563C4.00723 9.02063 4.38778 9.95396 5.14834 10.7156C5.9089 11.4773 6.84223 11.8578 7.94834 11.8573" fill="black"/>
                                </svg>
                                    
                                <input type="text" v-model="search_term" @input="debounceSearch" placeholder="search for anything">
            
                            </div>
                            
                            <div class="list" v-if="!search_mode"> 
                            
                                
                                <div class="section" v-for="(category, index) in Object.keys(categoryProductMapping)" :id="category">
                                    <div class="category-pane flex space-between">
            
                                        <p class="category-name" >{{category}}</p>

                                        <div class="flex flex-center-y" v-if="categoryProductMapping[category][0].remaining_products">
                                            <p class="primary primary-text">See all</p>
                                        </div>
            
                                        <template v-if="!expanded_categories.includes(category) && false">
                                            <button style="padding: 2px 10px; font-weight: 600; color: black; border-radius: 20px; background: rgba(0, 0, 0, 0.144)" class="gap-2 flex flex-center-y" @click="showCategoryImages(category)">
                                                <svg class="flex" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_73_13)">
                                                    <path d="M17.4987 14.1663H5.83203V2.49967H17.4987M17.4987 0.833008H5.83203C5.39 0.833008 4.96608 1.0086 4.65352 1.32116C4.34096 1.63372 4.16536 2.05765 4.16536 2.49967V14.1663C4.16536 14.6084 4.34096 15.0323 4.65352 15.3449C4.96608 15.6574 5.39 15.833 5.83203 15.833H17.4987C17.9407 15.833 18.3646 15.6574 18.6772 15.3449C18.9898 15.0323 19.1654 14.6084 19.1654 14.1663V2.49967C19.1654 2.05765 18.9898 1.63372 18.6772 1.32116C18.3646 1.0086 17.9407 0.833008 17.4987 0.833008ZM2.4987 4.16634H0.832031V17.4997C0.832031 17.9417 1.00763 18.3656 1.32019 18.6782C1.63275 18.9907 2.05667 19.1663 2.4987 19.1663H15.832V17.4997H2.4987M13.2987 8.57467L11.007 11.5247L9.3737 9.55801L7.08203 12.4997H16.2487L13.2987 8.57467Z" fill="black"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_73_13">
                                                    <rect width="20" height="20" fill="black"/>
                                                    </clipPath>
                                                    </defs>
                                                    </svg>
                                                    
                                                
                                                Show Images</button>
                                        </template>
                                        
            
                                        <template v-else-if="false">
                                            <button  style="padding: 2px 10px; color: black; font-weight: 600; border-radius: 20px; background: rgba(0, 0, 0, 0.144)" class="gap-2 flex flex-center-y" @click="showCategoryImages(category)">
                                                <svg class="flex" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_73_13)">
                                                    <path d="M17.4987 14.1663H5.83203V2.49967H17.4987M17.4987 0.833008H5.83203C5.39 0.833008 4.96608 1.0086 4.65352 1.32116C4.34096 1.63372 4.16536 2.05765 4.16536 2.49967V14.1663C4.16536 14.6084 4.34096 15.0323 4.65352 15.3449C4.96608 15.6574 5.39 15.833 5.83203 15.833H17.4987C17.9407 15.833 18.3646 15.6574 18.6772 15.3449C18.9898 15.0323 19.1654 14.6084 19.1654 14.1663V2.49967C19.1654 2.05765 18.9898 1.63372 18.6772 1.32116C18.3646 1.0086 17.9407 0.833008 17.4987 0.833008ZM2.4987 4.16634H0.832031V17.4997C0.832031 17.9417 1.00763 18.3656 1.32019 18.6782C1.63275 18.9907 2.05667 19.1663 2.4987 19.1663H15.832V17.4997H2.4987M13.2987 8.57467L11.007 11.5247L9.3737 9.55801L7.08203 12.4997H16.2487L13.2987 8.57467Z" fill="black"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_73_13">
                                                    <rect width="20" height="20" fill="black"/>
                                                    </clipPath>
                                                    </defs>
                                                    </svg>
                                                    
                                                
                                                Hide Images</button>
                                        </template>
                                        
                                    </div>
                                    <div class="flex-col" v-if="business.business_type !== 'restaurant'">
            
                                        <SimpleListShopItem v-if="business.business_type !== 'restaurant'" :parent_expanded="expanded_categories.includes(category)" :item="item" v-for="(item, index) in categoryProductMapping[category]" :key="index">
                                            <div class="gap-2 flex flex-center-y">
                                                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.3333 10L8.33325 5L7.15825 6.175L10.9749 10L7.15825 13.825L8.33325 15L13.3333 10Z" fill="#636363"/>
                                                    </svg>
                                                    
                                                <p>{{item?.name}}</p>
                                                <p class="single-line-ellipsis">{{item.description}}</p>
                                            </div>
                
                                            <div class="flex gap-2 flex-center-y">
                
                                                <div>
                                                    {{ "NGN" | currencySymbol }} 200.00
                                                </div>
                                                <div>
                                                    <button class="quantity-choose">+</button>
                                                </div>
                                            </div>
                                        </SimpleListShopItem>
                                        
                                    </div>
                                    
                                    <div style="display: grid; grid-template-columns: 48% 48%; gap: 16px" v-else>
                                        
                                        <GridItem :styling="styling" @onSelect="chooseProduct(item)"  :product="item" v-for="(item, index) in categoryProductMapping[category]" :key="index"></GridItem>


                                    </div>
            
                                    <div v-if="categoryProductMapping[category][0].remaining_products" class="padding-16 see-more">
                                        <p class="text-center">
                                            See {{ categoryProductMapping[category][0].remaining_products }} more products
                                        </p>
                                    </div>
            
                                    
                                </div>
            
            
            
                            </div>
            
                            <div class="list" v-else>
                                <div class="section">
                                    <SimpleListShopItem :item="product" v-for="(product, index) in searchedProducts" :key="index"></SimpleListShopItem>
            
                                    <template v-if="searching_db">
                                        <div class="flex-col flex-center-x flex-center-y">
                                            <LoadingState></LoadingState>
                                            <span>Searching items...</span>
                                        </div>
                                    </template>
                                </div>
                                
                            </div>

                    </template>

                    <template v-else-if="current_tab === 'search'">
                        <div class="search">
                          
                                
                            <input type="text" v-model="search_term" @input="debounceSearch" placeholder="search for anything">
        
                        </div>

                        <div class="list">
                            <div class="section">
                                <SimpleListShopItem :item="product" v-for="(product, index) in searchedProducts" :key="index"></SimpleListShopItem>
        
                                <template v-if="searching_db">
                                    <div class="flex-col flex-center-x flex-center-y">
                                        <LoadingState></LoadingState>
                                        <span>Searching items...</span>
                                    </div>
                                </template>
                            </div>
                            
                        </div>

                    </template>

                    <template v-else-if="current_tab === 'cart'">
                        <div class="padding-16">
                            <h2>Your Cart</h2>
                            
                            <template v-if="cart.length === 0">

                                <div >
                                    <p style="font-weight: 400;">You haven't selected any times. Please go back to the store</p>
                                </div>
                            </template>
                            <template v-else>

                                <div class="flex space-between" style="margin-bottom: 24px;">
                                    <h3>Confirm your Items</h3>
                                    <p style="font-weight: 600">Total: {{"NGN" | currencySymbol}} {{cartTotal}}</p>

                                </div>
                            
                                <div>
    
                                    <CartItem :key="item.id || index" v-for="(item, index) in cart" :item="item"></CartItem>
                                </div>

                                <div>
                                    <button class="big-btn full-width" @click="checkoutOnWhatsapp">Checkout on Whatsapp</button>
                                </div>
                            </template>
                        </div>
                    </template>

                    <template v-else-if="current_tab === 'whatsapp'">
                        <div class="whatsapp-light-background">
                            <p style="color: black;">You'll be taken to WhatsApp to contact this business</p>
                        </div>
                        <div class="padding-16-x">
                            <button class="big-btn full-width" @click="goToBusinessWhatsapp"> Contact on WhatsApp</button>
                        </div>
                    </template>
                    
    
                </div>

                <div class="bottom-sticky" v-if="false">
                    <div class="floating-cart" v-if="cart?.length" @click="show_cart_modal = !show_cart_modal">

                        <svg width="20" height="20" viewBox="0 0 20 20" :fill="current_tab == 'store' ? '#E53945' : 'black' " xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33333 4.99967V3.33301H16.6667V4.99967H3.33333ZM3.33333 16.6663V11.6663H2.5V9.99967L3.33333 5.83301H16.6667L17.5 9.99967V11.6663H16.6667V16.6663H15V11.6663H11.6667V16.6663H3.33333ZM5 14.9997H10V11.6663H5V14.9997Z" :fill="current_tab == 'store' ? '#E53945' : 'black' "/>
                        </svg>
                            


                    </div>
                </div>


                <div class="bottom-nav" v-if="false" :style="{'backgroundColor': styling ? styling.primary_color: 'whitesmoke'}">
                    <div class="navigation-item" @click="current_tab='store'">

                        <div class="navigation-item__container" >
                            <svg width="24" height="24" viewBox="0 0 20 20" :fill="current_tab === 'store' ? '#E53945' : 'black'" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33333 4.99967V3.33301H16.6667V4.99967H3.33333ZM3.33333 16.6663V11.6663H2.5V9.99967L3.33333 5.83301H16.6667L17.5 9.99967V11.6663H16.6667V16.6663H15V11.6663H11.6667V16.6663H3.33333ZM5 14.9997H10V11.6663H5V14.9997Z" :fill="current_tab === 'store' ? '#E53945' : 'black'"/>
                            </svg>
                                
                        </div>

                    </div>
                   <div class="navigation-item" @click="current_tab='search'">
                        
                        <div class="navigation-item__container" >
                            <svg  width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2642 12.0274C16.3034 10.6877 16.7931 9.00245 16.6338 7.31448C16.4745 5.6265 15.6781 4.06261 14.4067 2.94097C13.1352 1.81933 11.4842 1.22419 9.78958 1.27663C8.09491 1.32907 6.48388 2.02515 5.28422 3.22326C4.08352 4.4222 3.38516 6.03386 3.33147 7.72981C3.27777 9.42576 3.87278 11.0784 4.99524 12.3509C6.1177 13.6234 7.68313 14.42 9.37253 14.5783C11.0619 14.7367 12.7481 14.2449 14.0876 13.2033L14.1234 13.2408L17.6584 16.7766C17.7358 16.854 17.8277 16.9154 17.9289 16.9573C18.03 16.9992 18.1385 17.0208 18.248 17.0208C18.3575 17.0208 18.4659 16.9992 18.567 16.9573C18.6682 16.9154 18.7601 16.854 18.8376 16.7766C18.915 16.6992 18.9764 16.6072 19.0183 16.5061C19.0602 16.4049 19.0818 16.2965 19.0818 16.187C19.0818 16.0775 19.0602 15.9691 19.0183 15.8679C18.9764 15.7668 18.915 15.6748 18.8376 15.5974L15.3017 12.0624L15.2642 12.0274ZM13.5342 4.40242C14.0047 4.86532 14.3789 5.4168 14.6352 6.02504C14.8915 6.63328 15.0249 7.28624 15.0276 7.94627C15.0302 8.6063 14.9022 9.26034 14.6509 9.87064C14.3995 10.4809 14.0298 11.0355 13.5631 11.5022C13.0964 11.9689 12.5419 12.3386 11.9316 12.5899C11.3213 12.8413 10.6673 12.9693 10.0072 12.9666C9.3472 12.9639 8.69424 12.8306 8.086 12.5743C7.47776 12.318 6.92628 11.9438 6.46339 11.4733C5.53832 10.533 5.02226 9.26529 5.02764 7.94627C5.03301 6.62726 5.55937 5.36379 6.49206 4.4311C7.42475 3.4984 8.68822 2.97205 10.0072 2.96667C11.3263 2.9613 12.594 3.47736 13.5342 4.40242Z" :fill="current_tab === 'search' ? '#E53945' : 'black'"/>
                            </svg>
                                
                        </div>
                   </div>
                   <div class="navigation-item" @click="current_tab='cart'">
                    <div class="navigation-item__container" >
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1654 15.0003C13.2404 15.0003 12.4987 15.742 12.4987 16.667C12.4987 17.109 12.6743 17.5329 12.9869 17.8455C13.2994 18.1581 13.7233 18.3337 14.1654 18.3337C14.6074 18.3337 15.0313 18.1581 15.3439 17.8455C15.6564 17.5329 15.832 17.109 15.832 16.667C15.832 16.225 15.6564 15.801 15.3439 15.4885C15.0313 15.1759 14.6074 15.0003 14.1654 15.0003ZM0.832031 1.66699V3.33366H2.4987L5.4987 9.65866L4.36536 11.7003C4.24036 11.9337 4.16536 12.2087 4.16536 12.5003C4.16536 12.9424 4.34096 13.3663 4.65352 13.6788C4.96608 13.9914 5.39 14.167 5.83203 14.167H15.832V12.5003H6.18203C6.12678 12.5003 6.07379 12.4784 6.03472 12.4393C5.99565 12.4002 5.9737 12.3472 5.9737 12.292C5.9737 12.2503 5.98203 12.217 5.9987 12.192L6.7487 10.8337H12.957C13.582 10.8337 14.132 10.4837 14.4154 9.97533L17.3987 4.58366C17.457 4.45033 17.4987 4.30866 17.4987 4.16699C17.4987 3.94598 17.4109 3.73402 17.2546 3.57774C17.0983 3.42146 16.8864 3.33366 16.6654 3.33366H4.34036L3.55703 1.66699M5.83203 15.0003C4.90703 15.0003 4.16536 15.742 4.16536 16.667C4.16536 17.109 4.34096 17.5329 4.65352 17.8455C4.96608 18.1581 5.39 18.3337 5.83203 18.3337C6.27406 18.3337 6.69798 18.1581 7.01054 17.8455C7.3231 17.5329 7.4987 17.109 7.4987 16.667C7.4987 16.225 7.3231 15.801 7.01054 15.4885C6.69798 15.1759 6.27406 15.0003 5.83203 15.0003Z" :fill="current_tab === 'cart' ? '#E53945' : 'black'"/>
                        </svg>
                        
                        <div class="tag counter">
                            {{ cart.length }}
                        </div>
                            
                    </div>
                        
                   </div>
                   <div class="navigation-item" @click="current_tab='whatsapp'">
                    <div class="navigation-item__container">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8737 4.09204C15.1096 3.32046 14.1996 2.70868 13.1966 2.29234C12.1937 1.876 11.1179 1.66344 10.032 1.66704C5.48203 1.66704 1.7737 5.37537 1.7737 9.92537C1.7737 11.3837 2.15703 12.8004 2.8737 14.0504L1.70703 18.3337L6.08203 17.1837C7.29036 17.842 8.6487 18.192 10.032 18.192C14.582 18.192 18.2904 14.4837 18.2904 9.9337C18.2904 7.72537 17.432 5.65037 15.8737 4.09204ZM10.032 16.792C8.7987 16.792 7.59036 16.4587 6.53203 15.8337L6.28203 15.6837L3.68203 16.367L4.3737 13.8337L4.20703 13.5754C3.52165 12.4813 3.1578 11.2164 3.15703 9.92537C3.15703 6.14204 6.24036 3.0587 10.0237 3.0587C11.857 3.0587 13.582 3.77537 14.8737 5.07537C15.5134 5.71192 16.0203 6.46916 16.3651 7.30314C16.7098 8.13713 16.8855 9.03127 16.882 9.9337C16.8987 13.717 13.8154 16.792 10.032 16.792ZM13.7987 11.6587C13.5904 11.5587 12.5737 11.0587 12.3904 10.9837C12.1987 10.917 12.0654 10.8837 11.9237 11.0837C11.782 11.292 11.3904 11.7587 11.2737 11.892C11.157 12.0337 11.032 12.0504 10.8237 11.942C10.6154 11.842 9.9487 11.617 9.16536 10.917C8.5487 10.367 8.14036 9.69204 8.01536 9.4837C7.8987 9.27537 7.9987 9.16704 8.10703 9.0587C8.1987 8.96704 8.31536 8.81704 8.41536 8.70037C8.51536 8.5837 8.55703 8.49204 8.6237 8.3587C8.69036 8.21704 8.65703 8.10037 8.60703 8.00037C8.55703 7.90037 8.14036 6.8837 7.9737 6.46704C7.80703 6.06704 7.63203 6.11704 7.50703 6.1087H7.10703C6.96536 6.1087 6.7487 6.1587 6.55703 6.36704C6.3737 6.57537 5.84036 7.07537 5.84036 8.09204C5.84036 9.1087 6.58203 10.092 6.68203 10.2254C6.78203 10.367 8.14036 12.4504 10.207 13.342C10.6987 13.5587 11.082 13.6837 11.382 13.7754C11.8737 13.9337 12.3237 13.9087 12.682 13.8587C13.082 13.8004 13.907 13.3587 14.0737 12.8754C14.2487 12.392 14.2487 11.9837 14.1904 11.892C14.132 11.8004 14.007 11.7587 13.7987 11.6587Z" :fill="current_tab === 'search' ? '#E53945' : 'black'"/>
                        </svg>
                    </div>
                        
                   </div>
                    
                </div>

                <button v-if="cart.length > 0" @click="show_cart_modal = true" class="cart-sticky" :style="{'backgroundColor': styling ? styling.primary_color: 'whitesmoke'}">
                    Continue to Cart ({{ cart.length }} items)
                </button>
            </div>

            <div>

            </div>
        </div>
    </div>
</template>


<script>
import ShopCartModal from '../../components/modals/ShopCartModal.vue';
import SimpleListShopItem from '../../components/shop/SimpleListShopItem.vue';
import {mapGetters} from 'vuex';
import ShopCategoryNavigation from '../../components/navigations/ShopCategoryNavigation.vue';
import mixpanel from 'mixpanel-browser';
import GridItem from '../../components/shop/GridItem.vue';
import OrderModal from '../../components/modals/OrderModal.vue';

export default {
    data() {
        return {


            show_sidebar: false,
            tabs: ["Shop", "Deals", "Announcements", "Purchase History"],

            focused_product: null,

            current_category: "",
            loading_data: true,
            current_tab: 'shop',

            search_mode: false,
            search_timeout: null,
            search_term: "",
            searching_db: false,
            searched_products: [],


            products: [],
            business: null,
            categories: null,


            show_cart_modal: false,

            expanded_categories: [],

            customer_businesses: [],

            auth_customer: null
        };
    },
    mounted() {
        
    },
    methods: {
        followBusiness() {
            this.$api.post('/customers/follow-business', {
                business_id: this.business.id
            })
        },
        getCustomerSelf() {
            if (this.$cookies.get('usertoken')) {
                this.$api.get('/customers/self?includes=business_customers').then(resp=> {
                    this.auth_customer = resp.data.data
                    let business_customers = resp.data.data.business_customer;
                    this.customer_businesses = business_customers.map(b=> b.business);
                })
            }
        },
        chooseProduct(product) {
            this.focused_product = product
        },
        hexToRgba(hex, opacity) {
        // Remove the "#" from the hex string if it exists
            hex = hex.replace('#', '');

            // Parse the hex values into RGB components
            const r = parseInt(hex.substring(0, 2), 16); // Red
            const g = parseInt(hex.substring(2, 4), 16); // Green
            const b = parseInt(hex.substring(4, 6), 16); // Blue

            // Return the RGBA string with the opacity value
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        },
        selectTab(tab) {
            this.current_tab = tab.toLowerCase()
        },

        flattenCartIntoMessage() {
            let text = ''
            text += `New Order Request \nI'd like to buy the following:\n`
            
            for (let item of this.cart) {
                text += `\n${item.name} x ${item.quantity}\n`
            }

            return text
        },
        checkoutOnWhatsapp() {
            let message  = this.flattenCartIntoMessage();
            window.open(`whatsapp://send?text=${message}&phone=${this.business.contact_phone}`, '__blank')
        },
        changeCategory(category_name) {
            const category_element = document.getElementById(category_name);
            category_element?.scrollIntoView({behavior: 'smooth'})
        },

        showCategoryImages(category) {
            if (this.expanded_categories.find(c=> c === category)) {
                const index = this.expanded_categories.indexOf(this.expanded_categories.find(c=> c=== category));
                this.expanded_categories.splice(index, 1);
                return
            }
            this.expanded_categories.push(category)
        },
        goToBusinessWhatsapp() {
            if(this.business.contact_phone) {
                
                window.open(`whatsapp://send?text=Hi&phone=${this.business.contact_phone}`, '__blank')
            }
            else {
                window.open(`whatsapp://send?text=Hi&phone=${this.business.contact_phone}`, "__blank")

            }
        },
        

        debounce(func, delay) {
            clearTimeout(this.search_timeout); // Clear the previous timer

            this.search_timeout = setTimeout(() => {
                func();
            }, delay);
        },

    // The search function to execute after debounce
        search() {
            console.log("Searching for:", this.search_term);
            if (this.search_term) this.search_mode = true;
            this.searchDb()
        // Add your search logic here (API call, etc.)
        },

        debounceSearch() {
            this.debounce(this.search, 1500)
        },
        searchDb() {
            this.searching_db = true;
            this.$api.get('/products?business_id=149&name='+this.search_term).then(resp=> {
                this.searched_products = resp.data.data;
            }).finally(()=> {
                this.searching_db = false;
            })
        }
    },
    async fetch() {
        const response = await this.$api.get('/businesses/store-products?slug=' + this.$route.params.slug);
        const { business, products } = response.data.data;
        const categories = business.categories;
        this.business = business;
        this.products = products;
        this.categories = categories;
        this.loading_data = false
    },
    computed: {
        ...mapGetters("shop", ['cart']),

        styling() {
            //alert(this.business.styling)
            if (this.business.styling) return JSON.parse(this.business.styling);
            return null
        },
        taxes() {
            return 0
        },
        discount() {
            return 0
        },
        cartTotal() {
            let sum = 0;
            
            for (let item of this.cart) {
                sum += (item.unitprice * item.quantity);
            }

            return (sum + this.taxes) - this.discount
        },
        filteredCategories() {
            let array = [] 
           
            if (this.categories) {

    
                for (let c of this.categories) {
                    const category_products = this.products
                        .filter(p => p.category_id === c.id)
                        .sort((a, b) => a.name.localeCompare(b.name));
                    if (category_products.length) {
                        array.push(c)
                    }
                }
            }
            array.sort((a, b)=> {
                a.name.localeCompare(b.name)
            });

            return array
        },

        searchedProducts() {
            let final = []
            if (this.search_term) {

                const products = this.products.filter(p=> {
                    return p.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                    || p.description?.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                    //|| p.cateo.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 
                })

                final = products;

                const categories = this.categories.filter(c=> c.name?.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1);
                let category_products  = this.products.filter(p=> categories.map(c=> c.id).includes(p.category_id))
                if (category_products.length) {
                    for (let p of category_products) {
                        if (!final.find(pr=> pr.name == p.name)) 
                        final.push(p)
                    }
                
                }
                if (this.searched_products.length) {
                    for (let p of this.searched_products) {
                        if (!final.find(pr=> pr.name == p.name)) 
                        final.push(p)
                    }
                }
                
            }
            return final
        },
        categoryProductMapping() {
            const mapping = {

            }
            if (this.categories) {

    
                for (let c of this.categories) {
                    const category_products = this.products
                        .filter(p => p.category_id === c.id)
                        .sort((a, b) => a.name.localeCompare(b.name));
                    if (category_products.length) {
                        mapping[c.name] = category_products;
                    }
                }
            }
            return mapping;
        }
    },
    watch: {
        loading_data(value) {
            if (!value) {
                // set the current_category to the first category
                this.current_category = Object.keys(this.categoryProductMapping)[0]
                this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
                mixpanel.track("Store Viewed", this.business.name)

                this.getCustomerSelf()
            }
        },
        search_term(value) {
            if (!value) {
                this.search_mode = false;
                this.searched_products = []

            }
        }
    },
    components: { SimpleListShopItem, ShopCartModal, ShopCategoryNavigation, GridItem, OrderModal }
}
</script>

<style lang="scss" scoped>

* {
    font-family: "Inter", sans-serif !important;
    font-size: 14px;
}

.subscription-text {
    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-size: 14px;
  }

.whatsapp-light-background {
    background-color: white;
    border: 1px solid lightgrey;
    color: grey !important;
    border-radius: 10px !important;
    padding: 16px;
    margin: 16px;

    p {
        color: black !important;
    }
}

.checkout-whatsapp-btn {
    margin-top: 20px;
    @include largebutton;
    width: 100%;
    padding: 24px 16px  !important;
}
h2 {
    font-size: 18px;
    font-weight: 600;
}


.list {
    //background-color: whitesmoke;
    background-color: white;
    padding: 16px;
   //padding: 24px;
 //   margin: 60px 0;
    //padding: 80px 0;
}

.category-pane{ 
   
    //    border-radius: 10px;
    padding: 5px 0px;
    //border-bottom: 1px solid lightgrey;
    //border-bottom: 0;
    background-color: white;
}
.bottom-cta {
    display: flex;
    gap: 10px;
    background-color: lightgrey !important;
    color: black !important;
    padding: 8px 16px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    width: 100%;
    display: flex;
    font-size: 20px !important;
    font-weight: 500;
    //box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  //  border-top: 0.5px solid black;;

}

.page {
    position: relative;

    &__container {
        //padding: 100px 0px;
    }
}

.notifier {
    background-color: #f0f0f0; /* Light gray background */
    color: black; /* Dark text color */
}

.ad {
    width: 150px;
    border: 1px solid $border-grey;
    border-radius: 10px;
    margin: 2px 0px;

    img {
        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        object-fit: cover;

    }
}

.main {
    //background-color: $dashboard-background-color !important;
    background-color: white;
    min-height: 100vh;
}

.input {
    width: 30px;
    height: 30px;
    text-align: center;
    border: 1px solid grey;
}

.header {
    border-bottom: 1px $border-grey solid;

    &__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.category-name {
    font-family: Poppins !important;
    font-size: 20px;
   // border-bottom: 1px solid $border-grey;

    //font-style: italic;
    font-weight: 600;
    text-align: center;
    line-height: 32px;
}

.active-tab {
    //background-color: #FFCDD2 !important;
    background-color: $primary !important;
    color: white;
}

.account {
    width: 30px !important;
    height: 30px !important;
    background-image: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fimebehavioralhealth.com%2Fabout%2Fuser-icon-placeholder-1%2F&psig=AOvVaw0cqPByL1l_MMBcpLN_JY00&ust=1733877005633000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCfha75m4oDFQAAAAAdAAAAABAE');
}
.logo {

     p {
        font-size: 15px ;
        font-family: "Inter", sans-serif !important;
        font-weight: 600;
        color: black !important;

     }
}

.navbar {
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
       // background-color:white;
    color: black !important;

   // position: sticky;
    z-index: 1000;
    width: 100%;
   // margin: 2.5% !important;
    align-items: center;
    //border: 1px solid lightgrey;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    margin: auto;
   // top: 0;
   // left: 0;
   // margin-top: 10px;


    
    &__container {
        padding: 8px 16px;
        display: flex;
        align-items: center;

        

    }
}

.section {
    //padding: 16px 24px;
    margin-bottom: 10px;
}

.search {
    padding: 16px;

    position: relative;
   // border-bottom: 1px solid grey;
   //   box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   border-bottom: 1px solid lightgrey;
    .icon {
        position: absolute;
        top: 0px;
        left: 25px ;

    }

    input {
        border: 1px solid $border-grey;
        padding: 8px;
        border-radius: 10px;
        padding-left: 32px;
        width: 100%;
        height: 40px;
        background-color: white;
    }
}

.item {
    //padding: 16px;
    display: flex;
    font-size: 14px;
    color: $charcoal !important;
    padding: 8px 0;
    font-weight: 400;
    //padding: 8px 0px 8px 16px;
    

}


.tabs {
    background-color: whitesmoke;
    overflow: hidden;

    &__container {
        display: flex;
        gap: 16px;
        overflow:hidden;
    }
    &__item {
        padding: 10px 16px;
        white-space: nowrap;
        text-overflow: ellipsis;

        p {

            font-weight: 500 !important;
            font-size: 11px;
        }
    }

  
}

.selected_tab {
    border-bottom: 5px solid black;
}

.bookmark-btn {
    //background-color: black;
    border-radius: 10px;
    //padding: 8px 16px;
    font-weight: 600;
    padding: 8px 16px;
    //color: $primary !important;
    background-color: black;
    color: white;
}

.pay-button {
    background-color: $primary;
    color: white;
    padding: 6px 16px;
    border-radius: 10px;
}


.single-line-ellipsis{
    white-space: nowrap;       /* Prevents text from wrapping to the next line */
    overflow: hidden;          /* Hides overflowing text */
    text-overflow: ellipsis;   /* Adds an ellipsis ("...") to represent the clipped text */
    width: 100%;              /* Set a fixed width to see the effect */
    //border: 1px solid #ccc;
}


.sidebar {
    
    background-color: 100%;
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.355);
    z-index: 20;
    display: flex;
    justify-content: flex-end;
    padding: 50px 0;

    &__container {
        
        width: 50%;
        background-color: white;
        height: 100%;
        color: black;
        position: absolute;
        top: 0;
        padding: 16px;
    }

    &__header {
        p {
            &:first-of-type {
                font-size: 15px;
                color: grey;
            }
            &:last-of-type {
                font-size: 12px;
            }
        }
    }

    &__body {
        padding: 16px 0;
        margin-top: 10px;
        border-top: 1px solid lightgrey;
    }
    &__business {
        display: flex;
        gap: 8px;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        align-items: center;
        padding: 10px 0;
        margin: 10px 0;
        border-bottom: 1px solid lightgrey !important;

        img {
            border-radius: 50%;
            height: 30px;
            width: 30px;
        }

        p {
            white-space: nowrap;
            font-size: 13px;
        }
    }
}
.cart-sticky {
    width: 95%;
    position: fixed;
    bottom: 0;
    left: 2.5%;
    margin-bottom: 16px;
    border-radius: 999px;
    font-weight: 600;

    display: block;
    //height: 60px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: 15px;
    padding: 16px;
    justify-content: center;



}
.bottom-nav {
    display: grid;
    flex-direction: column;
    
    position: fixed;
    grid-template-columns: 25% 25% 25% 25%;
    justify-content: center;
    width: 100%;
    bottom: 2.5%;
    border-radius: 100px;
    //padding: 16px;
    width: 95%;
    left: 2.5%;
    height: 60px;
    
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    font-size: 20px !important;
    background-color:black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        //margin-left: 5px;

    .navigation-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        //border-right: 1px solid $border-grey;
        border-radius: 100px;

        &__container {
            padding: 16px;
            position: relative;

            width: 50%;
            margin: auto;
            border-radius: 2px;
        }

    }

}

.bottom-sticky {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 16px;
    

}

.header {
    background-color: whitesmoke;
    &__container {
        padding: 16px;
    }
}

.counter {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    font-size: 14px;
    background-color: $primary;
    position: absolute;
    right: 0;
    top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
}

.floating-cart {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: ease-in-out 0.5s all;
    
    &:hover {
        transform: scale(1.05);
    }

    
}

.see-more {
    background-color: whitesmoke;
    font-weight: 600;
    cursor: pointer;

}

.bookmark {
    button {
      

    }
}
.whatsapp{
    button {
       
        
    }
}

.logo {
    display: flex;
    &__container {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    h1 {
        font-weight: 600;
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
</style>