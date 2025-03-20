export const state = () => ({
    cart: []
    

})

export const mutations = ({
    setCart(state, value) {
        state.cart = value;
    },
    

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
    cart: state => state.cart,
    
}