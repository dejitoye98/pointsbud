export const state = () => ({
    business_is_open: false,
    menu: {},
    products:[],   
    
    prefs: [],

    cart: [],
    focused_product: null,
    show_cart_modal: false,
    show_order_modal: false,
    search_term: '',
    deliveryRegions: null,
    business: null,
    customer_notifications: [],
    show_customer_notifications: false,

    show_fund_wallet_modal: false,
    

})

export const mutations = ({
    setBusiness(state, value) {
        state.business = value;
    },
    setShowCustomerNotifications(state, value) {
        state.show_customer_notifications = value;
    },

    setCustomerNotifications(state,value) {
        state.customer_notifications = value
    },
    setDeliveryRegions(state, value) {
        state.deliveryRegions = value
    },
    setSearchTerm(state, value) {
        state.search_term = value
    },
    setBusinessIsOpen(state, value) {
        state.business_is_closed = value
    },

    showFundWalletModal(state, value) {
        state.show_fund_wallet_modal = value
    },

    setMenu(state, value) {
        state.menu = value;
    },
    
    setProducts(state, value) {
        state.products  = value;
    },

    setCart(state, value) {
        state.cart = value
    },
    setFocusedProduct(state, value) {
        state.focused_product = value
    },
    setCartModal(state, value) {
        state.show_cart_modal = value
    },
    setOrderModal(state, value) {
        state.show_order_modal = value
    },
    setPrefs(state, value) {
        state.prefs = value
    }


})


export const actions = {
    readNotifications({dispatch,commit, state}, notification_ids) {
        return new Promise((resolve, reject) => {
            return this.$api.post('/customers/notifications/read', {notification_ids})
                .then(resp=> {
                    if (state.customer_notifications.length) {
                        //for each notificaiton, change read to true lcoally 
                        let new_notifs  = []
                        for (let notif of JSON.parse(JSON.stringify(state.customer_notifications))) {
                            notif.seen = true;

                            new_notifs.push(notif)
                        }
                       commit('setCustomerNotifications', new_notifs)
                       resolve(resp)
                    }
                })
        })
    },
    getCustomerNotifications({ dispatch, commit, state, }, payload) {
        return new Promise((resolve, reject) => {

                return this.$api.get(`/customers/notifications`)
                    .then(resp => {
                        commit('setCustomerNotifications', resp.data.data)
                      //  dispatch('readNotifications', resp.data.data.map(item=> item.id))
                        resolve(resp)
                    })
                    .catch(err => {
                        //commit('setArticles', err)
                        console.log(err)
                        reject(err)
                    });
            
        })
    },
    getMenu({ dispatch, commit, state }, payload) {
        return new Promise((resolve, reject) => {

                this.$api.get(`/menu/${payload.slug}`)
                    .then(resp => {
                        commit('setMenu', resp.data.data)
                        commit('setProducts', resp.data.data.business.products)
                        resolve(resp)
                    })
                    .catch(err => {
                        //commit('setArticles', err)
                        console.log(err)
                        reject(err)
                    });
            
        })
    },
    addToCart({ dispatch, commit, state }, payload) {
        let cart = JSON.parse(JSON.stringify(state.cart))
        if (!cart.find(c=> payload.id === c.id)) {
            cart.push(payload)

            commit('setCart', cart)
        }
        
        
    },
    removeFromCart({dispatch, commit, state}, product_id) {
        let cart = JSON.parse(JSON.stringify(state.cart));
        
        const item = cart.find(i=> i.id === product_id);
        if (item) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
            commit('setCart', cart)
        }

    },
    setItemQuantity({commit, state}, params) {
        let cart = JSON.parse(JSON.stringify(state.cart));
        const item = cart.find(i=> i.id === (params.product_id || params.id));
        let remove = false
        if(params.quantity === 0) {
            remove = true;
        }

        if (item) {
            const index = cart.indexOf(item); 
            item.quantity = params.quantity;
          
            if(remove) {
                cart.splice(index, 1);
            }
            else {

                cart[index] = item;
            }
            commit('setCart', cart)
        }
    },
    increaseItemQuantity({commit, state}, product_id) {
        let cart = JSON.parse(JSON.stringify(state.cart));
        const item = cart.find(i=> i.id === product_id);

        if (item) {
            const index = cart.indexOf(item); 
            item.quantity++;
            cart[index] = item;
            commit('setCart', cart)
        }

    },
    decreaseItemQuantity({commit, state}, product_id) {
        let cart = JSON.parse(JSON.stringify(state.cart));
        const item = cart.find(i=> i.id === product_id);

        if (item) {
            const index = cart.indexOf(item); 
            if (item.quantity > 1) {

                item.quantity--;
                cart[index] = item;
                commit('setCart', cart)
            }
            else {
                // remove 
                let index = cart.indexOf(item);
                cart.splice(index, 1)

                commit('setCart', cart)
            }
        }

    }
}


export const getters = {
    business_is_open: state => state.business_is_open,
    menu: state => state.menu,
    products: state => state.products,

    business: state => state.business,

    cart: state => state.cart,
    focused_product: state => state.focused_product,
    show_cart_modal: state => state.show_cart_modal,
    show_order_modal: state => state.show_order_modal,

    search_term: state => state.search_term,
    deliveryRegions: state => state.deliveryRegions,
    prefs: state => state.prefs,

    customer_notifications: state => state.customer_notifications,
    show_customer_notifications: state => state.show_customer_notifications,

    show_fund_wallet_modal: state=> state.show_fund_wallet_modal
}