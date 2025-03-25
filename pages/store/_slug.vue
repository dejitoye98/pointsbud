<template>
    <div class="page">
        <!--<ShopCartModal @close="show_cart_modal = false" v-if="show_cart_modal && this.cart.length">

        </ShopCartModal>-->

        <ChooseModeModal v-if="choose_mode && !table_identifier" @close="choose_mode = false" @onChoose="changeMode"></ChooseModeModal>
    
        <LiveMenuModal  :business="business" v-if="show_live_menu_modal && false" @close="show_live_menu_modal = false">
                
        </LiveMenuModal>
        <AuthModal v-if="show_auth_modal"></AuthModal>

        <OrderModal @close="focused_product = null" :item="focused_product"></OrderModal>

        <CartModal :mode="current_mode"  @close="show_cart_modal = false"  v-if="show_cart_modal && this.cart.length" :business="business"></CartModal>
        
        <PromotionsModal @close="show_promotion_modal = false"  v-if="show_promotion_modal" :mixpanel="mixpanel" :device_id="device_id" :promotion="promotion"></PromotionsModal>

        <template v-if="!loading_data">


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
                    <div class="header">
                        <div class="header__container">
                            <div class="logo">
                                <div class="logo__container">
                                    <img :src="business.logo">
                                    <h1>{{business.name}}</h1>
                                </div>
                            </div>
                    
                            
                            <div v-if="showBookmarkButton" class="flex-center-y flex gap-16">
                                <button @click="triggerBookmark" class="bookmark-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="icon"
                                      width="18"
                                      height="18"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M17.25 3H6.75A2.25 2.25 0 004.5 5.25v15.12a.75.75 0 001.123.654l6.377-3.586 6.377 3.586a.75.75 0 001.123-.654V5.25A2.25 2.25 0 0017.25 3z"
                                      />
                                    </svg>
                                    Bookmark
                                </button>
                            </div>
                    
                            <div class="" @click="show_sidebar = true" v-if="auth_customer && auth_customer.id">
                                <div class="account" style="border-radius: 50%; height: 40px; width: 40px;">
                                    <img src="https://pointsbud-images.s3.amazonaws.com/c794267fc81e77a48e608d36e3f0f3f1" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="tabs">
                        <div class="tabscontainer">
                            <div class="tabsitem" 
                                 :class="[current_tab === tab.toLowerCase() ? 'selected_tab' : '']" 
                                 :style="{borderBottom: current_tab === tab.toLowerCase() ? '4px solid ' + (styling?.primary_color || 'black') : '' }" 
                                 @click="selectTab(tab)" 
                                 v-for="(tab, index) in tabs" 
                                 :key="index">
                                <p>{{tab}}</p>
                                <template v-if="tab.toLowerCase() === 'deals' && deals?.length > 0">
                                    <div class="badge">
                                        {{ deals?.length }}
                                    </div>
                                </template>
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
    
    
                        <div style="position: sticky; top: 0; left: 0; background: white; z-index: 10">
    
                            <ShopCategoryNavigation :styling="styling" v-if="current_tab === 'shop' " @changeCategory="changeCategory" :current_category="current_category" :categories="filteredCategories"></ShopCategoryNavigation>
                        </div>
    
                       
                        
        
    
                        <template v-if="current_tab === 'shop'">
    
                                <div class="search">
                                    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.2375 16.7948L11.0192 11.5765C10.6025 11.9315 10.1233 12.2062 9.58167 12.4006C9.04001 12.5951 8.49556 12.6923 7.94834 12.6923C6.6139 12.6923 5.48445 12.2303 4.56001 11.3065C3.63556 10.3826 3.17334 9.2534 3.17334 7.91896C3.17334 6.58452 3.63501 5.45479 4.55834 4.52979C5.48167 3.60479 6.61056 3.14174 7.94501 3.14063C9.27945 3.13952 10.4095 3.60174 11.335 4.52729C12.2606 5.45285 12.7233 6.58257 12.7233 7.91646C12.7233 8.49535 12.6208 9.05563 12.4158 9.59729C12.2108 10.139 11.9414 10.6023 11.6075 10.9873L16.8258 16.2048L16.2375 16.7948ZM7.94917 11.8581C9.05473 11.8581 9.98806 11.4776 10.7492 10.7165C11.5103 9.95535 11.8908 9.02174 11.8908 7.91563C11.8908 6.80952 11.5103 5.87618 10.7492 5.11563C9.98806 4.35507 9.05473 3.97452 7.94917 3.97396C6.84362 3.9734 5.91001 4.35396 5.14834 5.11563C4.38667 5.87729 4.00612 6.81063 4.00667 7.91563C4.00723 9.02063 4.38778 9.95396 5.14834 10.7156C5.9089 11.4773 6.84223 11.8578 7.94834 11.8573" fill="black"/>
                                    </svg>
                                        
                                    <input type="text" v-model="search_term" @input="debounceSearch" placeholder="search for anything">
                
                                </div>
                                
                                <div class="list" v-if="!search_term"> 
                                
                                    
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
                                        
                                        <div :style="{display: 'grid', gridTemplateColumns: '48% 48%', gap: '16px' }" v-else>
                                          
                                            <GridItem 
                                              :styling="styling" 
                                              @onSelect="chooseProduct(item)"  
                                              :product="item" 
                                              v-for="(item, index) in categoryProductMapping[category]" 
                                              :key="index">
                                            </GridItem>
    
    
                                        </div>
                
                                        <div v-if="categoryProductMapping[category][0]?.remaining_products" class="padding-16 see-more">
                                            <p class="text-center">
                                                See {{ categoryProductMapping[category][0]?.remaining_products }} more products
                                            </p>
                                        </div>
                
                                        
                                    </div>
                
                
                
                                </div>
                
                                <div class="list" v-else>
                                    <div class="section">
                                        <GridItem 
                                          :is_list_item="table_identifier"

                                          :product="product" v-for="(product, index) in searchedProducts" :key="index"></GridItem>
                
                                        <template v-if="searching_db">
                                            <div class="flex-col flex-center-x flex-center-y">
                                                <LoadingState></LoadingState>
                                                <span>Searching items...</span>
                                            </div>
                                        </template>
                                    </div>
                                    
                                </div>
    
                        </template>
    
                        <template v-else-if="current_tab === 'deals'">
                            <DealsSection></DealsSection>
                        </template>


                        <template v-else-if="current_tab.toLowerCase() === 'announcements'">
                            <div>
                                <p class="text-center padding-16">No announcements yet</p>
                            </div>
                        </template>
    
                        <!--- 
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
                        </template>-->
                        
        
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
    
                    <button v-if="cart.length > 0" @click="show_cart_modal = true" class="cart-sticky" :style="{'backgroundColor': styling ? styling.primary_color: 'whitesmoke', color: styling? styling.text_on_primary : ''}">
                        Continue to Cart ({{ cart.length }} items)
                    </button>
                </div>
    
                <div>
    
                </div>
            </div>
        </template>

        <template v-else>
            <div style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center;">

                <LoadingState>
    
                </LoadingState>
                <p>Loading Your PointsBud</p>
            </div>
        </template>
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
import ChooseModeModal from '../../components/modals/ChooseModeModal.vue';
import DealsSection from '../../components/shop/DealsSection.vue';

export default {
    data() {
        return {
            table_identifier: null,
            show_promotion_modal: false,
            device_id: null,

            current_mode: '',
            choose_mode: true,
            show_live_menu_modal: false,

            show_auth_modal: false,


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

            auth_customer: null,

            promotions: [],
            promotion: null,
            device_id: null,
        };
    },
    mounted() {
        
    },

    created() {
      if (this.$route.query.t) {
        this.table_identifier = this.$route.query.t
      }
    },
    methods: {
      registerBusinessScan() {
            const vm = this;
            function getDeviceId() {
                let device_id = window.localStorage.getItem("_deviceid"); 
                if (!device_id)  {
                    device_id = vm.generateUniqueCode(8); 
                    window.localStorage.setItem("_deviceid", device_id)

                }
                return device_id
                
            }

            const device_id = getDeviceId();
            
            this.$api.post('/qr/register-scan', {
                business_id: this.business?.id,
                device_id

            }).then(resp=> {

            })
        },
      getPromotions() {
            this.$api.get('/promotions?retrieve_all=true&business_id='+this.business?.id).then(resp=> {
                this.promotions = resp.data.data;
                this.promotion = this.promotions[0]
               // this.promotion = resp.data.data

                if (this.promotion) {
                    //alert(JSON.stringify(this.promotion))
                    // preload the image 
                    const img = new Image();
                    img.src = this.promotion?.thumbnail;
                    //alert(img.src)


                    img.onload = () => {
                      
                        //lert('loaded')
                        setTimeout(() => {

                            if (this.promotion) {

                               
                              //  alert(img)
                                this.show_promotion_modal = true;
                                // create an image
                            }


                        }, 5000)
                    }
                    

                }
          
               
            }).catch(e => {
              alert(e)
            })
        },
      addToRecentlyVisited() {
          try {
            // Get existing recently visited items
            let recentlyVisited = [];
            const storedData = window.localStorage.getItem('recently_visited');
            
            if (storedData) {
              recentlyVisited = JSON.parse(storedData);
            }
            
            // Check if the current business already exists in the array
            const currentSlug = this.business?.slug;

            //alert(JSON.stringify(this.business))

          // alert(currentSlug)
            
            if (!currentSlug) {
              return; // Exit if no business slug is available
            }
            
            // Remove the current business if it already exists in the array
            recentlyVisited = recentlyVisited.filter(slug => slug !== currentSlug);
            
            // Add the current business to the beginning of the array (most recent)
            recentlyVisited.unshift(currentSlug);
            
            // Limit the array to a maximum number of entries (e.g., 10)
            const maxEntries = 10;
            if (recentlyVisited.length > maxEntries) {
              recentlyVisited = recentlyVisited.slice(0, maxEntries);
            }
            
            // Save back to localStorage
            window.localStorage.setItem('recently_visited', JSON.stringify(recentlyVisited));
          } catch(e) {
            console.log(e);
          }
        },
        changeMode(value) {
            this.current_mode = value;
        },
        triggerBookmark() {
            mixpanel?.track("Clicked Bookmark Store", {business: this.business?.name})
            if (this.auth_customer && this.auth_customer.id) {
                this.followBusiness()
            }
            else {
                this.show_auth_modal = true;
            }
        },
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
        this.loading_data = false;
        this.show_auth_modal = false;
    },
    computed: {
        ...mapGetters("shop", ['cart']),

        selectedTabStyle() {
            let style = {
                "borderBottom": "2px solid black"
            }
            
            if (this.styling?.primary_color) {
                style.borderBottom = "2px solid " + this.styling.primary_color
            }
        },

        deals() {
            return this.products.filter(item => item.is_deal)
        },

        showBookmarkButton() {
            if (!this.auth_customer || !this.auth_customer?.id || this.customer_businesses.length === 0 || 
            
            !this.customer_businesses.find(business=>business.id === this.business.id)) {
                return true
            }

            return false
        },

        styling() {
            //alert(this.business.styling)
            if (this.business?.styling) return JSON.parse(this.business.styling);
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
                    return p.name?.toLowerCase().indexOf(this.search_term?.toLowerCase()) > -1 
                    || p.description?.toLowerCase().indexOf(this.search_term?.toLowerCase()) > -1 
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
              // First, get ordered categories
          orderedCategories() {
              if (!this.categories) return [];
              
              // Sort categories by priority
              return [...this.categories].sort((a, b) => {
                  const priorityA = a.priority !== undefined ? a.priority : 999;
                  const priorityB = b.priority !== undefined ? b.priority : 999;
                  return priorityA - priorityB;
              });
          },

          // Then use ordered categories in your mapping
          categoryProductMapping() {
              const mapping = {};
              
              if (this.orderedCategories.length) {
                  for (let c of this.orderedCategories) {
                      const category_products = this.products
                          .filter(p => p.category_id === c.id)
                          .sort((a, b) => {
                              // Sort by priority first (lower number means higher priority)
                              if ((a.priority || 999) < (b.priority || 999)) {
                                  return -1; // `a` comes before `b`
                              }
                              if ((a.priority || 999) > (b.priority || 999)) {
                                  return 1; // `b` comes before `a`
                              }
                              
                              // If priority is the same, sort by name
                              return a.name.localeCompare(b.name);
                          });
                          
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
                this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
                mixpanel.track("Store Viewed ", {
                  business: this.business?.name
                })
                
                this.getCustomerSelf()
                this.current_category = Object.keys(this.categoryProductMapping)[0]


                //this.addToRecentlyVisited();

                // setTi

                setTimeout(()=> {
                    this.show_live_menu_modal = true
                }, 2000)


                this.registerBusinessScan()
                this.getPromotions()
            }
        },
        search_term(value) {
            if (!value) {
                this.search_mode = false;
                this.searched_products = []

            }
        },
        business(value) {
          if (value) {
            this.addToRecentlyVisited()
          }
        }
    },
    components: { SimpleListShopItem, ShopCartModal, ShopCategoryNavigation, GridItem, OrderModal, ChooseModeModal, DealsSection }
}
</script>

<style lang="scss" scoped>
// Typography
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

// Color Variables
//$primary: var(--primary-color, #FF6B6B);
$primary-dark: darken($primary, 10%);
$primary-light: rgba($primary, 0.1);
$primary-lighter: rgba($primary, 0.05);
$primary-border: rgba($primary, 0.3);

$text-dark: #222222;
$text-medium: #555555;
$text-light: #888888;
$text-lighter: #bbbbbb;

$background-white: #FFFFFF;
$background-light: #F9F9F9;
$background-lighter: #F5F5F5;
$border-color: #EEEEEE;
$border-light: rgba(238, 238, 238, 0.7);

$shadow-soft: 0 4px 10px rgba(0, 0, 0, 0.035);
$shadow-medium: 0 8px 20px rgba(0, 0, 0, 0.07);
$shadow-focus: 0 0 0 3px rgba($primary, 0.2);
$shadow-button: 0 4px 12px rgba($primary, 0.3);

$success: #4CAF50;
$warning: #FFC107;
$error: #FF5252;
$info: #2196F3;

// Base Styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

// Utility Classes
.flex {
  display: flex;

  &-center-y {
    align-items: center;
  }

  &-center-x {
    justify-content: center;
  }

  &-col {
    flex-direction: column;
  }
}

.gap-2 {
  gap: 8px;
}

.gap-16 {
  gap: 16px;
}

.space-between {
  justify-content: space-between;
}

.padding-16 {
  padding: 16px;
}

.padding-16-x {
  padding-left: 16px;
  padding-right: 16px;
}

.padding-8-x {
  padding-left: 8px;
  padding-right: 8px;
}

.text-center {
  text-align: center;
}

.primary {
  color: $primary;
}

.primary-text {
  font-weight: 600;
}

.single-line-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

// Main Container
.page__container {
  max-width: 500px;
  margin: 0 auto;
  background-color: $background-light;
  min-height: 100vh;
  position: relative;
  box-shadow: $shadow-medium;
}

// Sidebar
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.3s ease;

  &__container {
    width: 80%;
    max-width: 360px;
    height: 100%;
    background-color: $background-white;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    animation: slideIn 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &__header {
    padding: 24px 20px;
    background-color: $primary-lighter;
    border-bottom: 1px solid $border-light;

    p {
      &:first-child {
        font-size: 18px;
        font-weight: 600;
        color: $text-dark;
        margin-bottom: 6px;
      }

      &:last-child {
        font-size: 14px;
        color: $text-medium;
      }
    }
  }

  &__body {
    padding: 20px;

    .section-tite {
      margin-bottom: 15px;

      .subscription-text {
        font-size: 15px;
        font-weight: 600;
        color: $text-dark;
        position: relative;
        display: inline-block;
        
        &:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: $primary;
          border-radius: 2px;
        }
      }
    }
  }

  &__business {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 12px;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-bottom: 8px;
    
    &:hover {
      background-color: $background-lighter;
      transform: translateX(4px);
    }
    
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid $border-light;
    }
    
    p {
      font-size: 14px;
      font-weight: 500;
      color: $text-medium;
    }
  }
}

// Main Content Area
.main {
  background-color: $background-white;
  position: relative;
  min-height: 100vh;
}

// Header
.header {
  background-color: $background-white;
  box-shadow: $shadow-soft;
  //position: sticky;
  //top: 0;
  z-index: 50;
  
  &__container {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__purchases {
    font-size: 14px;
    font-weight: 500;
    color: $text-medium;
  }
  
  &__wallet {
    p {
      font-weight: 500;
      color: $text-dark;
    }
    
    .pay-button {
      padding: 8px 16px;
      background-color: $primary;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: $primary-dark;
        transform: translateY(-2px);
      }
    }
  }
}

// Logo
.logo {
  &__container {
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid $border-light;
    }
    
    h1 {
      font-size: 18px;
      font-weight: 600;
      color: $text-dark;
      margin: 0;
    }
  }
}

// Account Button
.account {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: $shadow-soft;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// Bookmark Button
.bookmark-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: $primary;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba($primary, 0.4);
  }
  
  .icon {
    flex-shrink: 0;
  }
}

// Tabs
.tabs {
  //position: sticky;
  //top: 68px;
  z-index: 40;
  background-color: $background-white;
  border-bottom: 1px solid $border-light;
  padding: 0;
  box-shadow: $shadow-soft;
  
  .tabscontainer {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 10px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .tabsitem {
    padding: 16px 20px;
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.25s ease;
    
    p {
      font-size: 15px;
      font-weight: 500;
      color: $text-medium;
      margin: 0;
      transition: color 0.2s;
    }
    
    &:hover:not(.selected_tab) p {
      color: $text-dark;
    }
    
    &.selected_tab {
      p {
        font-weight: 600;
        color: $primary;
      }
    }
    
    .badge {
      position: absolute;
      top: 8px;
      right: 8px;
      min-width: 18px;
      height: 18px;
      background-color: $primary;
      color: white;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      box-shadow: 0 2px 5px rgba($primary, 0.3);
      animation: pulse 2s infinite;
    }
  }
}

// Notification
.notifier {
  background-color: rgba($warning, 0.1);
  border-left: 3px solid $warning;
  margin: 10px 16px;
  border-radius: 8px;
  
  svg {
    color: $warning;
  }
  
  p {
    font-size: 14px;
    color: $text-medium;
  }
}

// Search
.search {
  position: relative;
  padding: 16px;
  border-bottom: 1px solid $border-light;
  
  .icon {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: $text-light;
  }
  
  input {
    width: 100%;
    padding: 14px 16px 14px 40px;
    border: 1px solid $border-color;
    border-radius: 10px;
    font-size: 14px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: $shadow-focus;
    }
    
    &::placeholder {
      color: $text-lighter;
    }
  }
}

// Lists and Grid
.list {
  padding: 16px;
}

.section {
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 80px;
  }
}

.category-pane {
  padding: 16px 0 12px;
  
  .category-name {
    font-size: 18px;
    font-weight: 600;
    color: $text-dark;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: $primary;
      border-radius: 2px;
    }
  }
  
  .primary-text {
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      color: $primary-dark;
      transform: translateX(3px);
    }
  }
}

.see-more {
  margin-top: 10px;
  margin-bottom: 20px;
  
  p {
    font-size: 14px;
    color: $text-medium;
    padding: 12px;
    background-color: $background-lighter;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      background-color: $primary-lighter;
      color: $primary;
    }
  }
}

// Bottom Navigation
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  height: 60px;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  
  .navigation-item {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &__container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        transform: translateY(-3px);
      }
      
      .tag.counter {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 18px;
        height: 18px;
        background-color: $primary;
        color: white;
        border-radius: 50%;
        font-size: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// Floating Cart Button
.floating-cart {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-button;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba($primary, 0.4);
  }
}

// Sticky Cart Button
.cart-sticky {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 460px;
  padding: 16px 24px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: $shadow-button;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  
  &:hover {
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 8px 25px rgba($primary, 0.45);
  }
}

// Grid Layout
[style*="display: grid"] {
  margin-top: 10px;
  margin-bottom: 20px;
}

// Loading State
.flex-center-x.flex-center-y {
  padding: 30px 0;
  
  span {
    margin-top: 12px;
    color: $text-medium;
    font-size: 14px;
  }
}

// Quantity Button
.quantity-choose {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $primary;
  color: white;
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: scale(1.1);
  }
}

// Animations
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

// Media Queries
@media (max-width: 500px) {
  .page__container {
    max-width: 100%;
  }
  
  .cart-sticky {
    width: 92%;
  }
  
  .tabs .tabsitem {
    padding: 14px 16px;
  }
  
  .category-pane .category-name {
    font-size: 17px;
  }
}

// Tab Variant
.tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: $text-medium;
  cursor: pointer;
  transition: all 0.2s;
  
  svg {
    flex-shrink: 0;
  }
  
  &:hover {
    background-color: $background-lighter;
  }
  
  &.active-tab {
    background-color: $primary;
    color: white;
  }
}

// Big Button
.big-btn {
  padding: 16px 24px;
  background-color: $primary;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: $shadow-button;
  
  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba($primary, 0.4);
  }
  
  &.full-width {
    width: 100%;
  }
}

// WhatsApp Background
.whatsapp-light-background {
  margin: 16px;
  padding: 16px;
  background-color: #DCF8C6;
  border-radius: 12px;
  
  p {
    text-align: center;
    font-size: 14px;
  }
}

// Utility to smooth out any rough edges in styling
body {
  color: $text-dark;
  line-height: 1.5;
  overflow-x: hidden;
}
</style>