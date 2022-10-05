<template>
    <div class="add">
        <div class="form-group advert-link"  v-for="(link,index) in links" :key="index">
            <span class="error">{{link_errors[index]}}</span>
            <div class="advert-link-head" v-if="index !== 0" @click="removeLink(index)">
                <span>Remove</span>
            </div>
            <div class="form-group form-group--row advert-link-row">
                <div class="form-input">
                    <label for="">Link URL <span>*</span></label>
                        <input type="text" placeholder="https://link-you-want-to-advertise.com" v-model="link.link">
                </div>
                <div class="form-input">
                    <label for="">Pay per click <span>*</span></label>
                    <input type="number" v-model="link.pay_per_click">
                </div>
            </div>
            <div class="form-input">
                <label for="">Advert note <span>*</span></label>
                <textarea :placeholder="'We are selling products. Visit: ' +  link.link" v-model="link.advert_note"></textarea>
            </div>
        </div>
        <div class="add-link">
            <p @click="addLink">Add link</p>
        </div>
        <div class="cta">
            <button>Add</button>
        </div>
    </div>

</template>


<script>
export default {
    data() {
        return {
            links: [
                {
                    link: '', pay_per_click: '', advert_note: ''
                }
            ],
            link_errors: ['']
        }
    },
    methods: {
        removeLink(index) {
            this.links.splice(index, 1);
            this.link_errors.splice(index, 1)
        },
        addLink() {
            this.links.push({
                link: '',
                pay_per_click: '',
                advert_note: ''
            })
            this.link_errors.push("")
        },
        validate() {
            let can_continue = true
            this.links.forEach((link, index) => {
                if (!link.link || !link.pay_per_click || !link.advert_note) {
                    //alert(link)
                    this.$set(this.link_errors, index, "Please enter all fields")
                    //this.link_errors[index] =  "Please enter all fields for all links"
                    //if (!this.link_errors[index]) this.link_errors[index] = ""
                    //this.link_errors[index] =   "Please enter all fields"
                    can_continue = false
                }
            })

            return can_continue
        }
    }
}
</script>


<style lang="scss" scoped>

.error {
    color: red;
    font-size: 14px;
}
.cta {
    display: flex;
    justify-content: flex-end;
    button {
        @include smallbutton;

    }
}
.form-group { 
    display: flex;
    flex-direction: column;
    border: rgba(211, 211, 211, 0.263) 1px solid ;
    border-radius: 5px;
    padding: 8px;
    &--row {
        padding: 0;
        border: none;
        flex-direction: row;
        justify-content: space-between;
    }
}
.advert-link { 
    margin-bottom: 8px;
    &-head {
        display: flex;
        justify-content: flex-end;
        span {
            color: $lightaccent;
            cursor: pointer;
        }
    }
    @include media("<=dashbreak") {
        flex-direction: column;
        justify-content: center;
    }
}
.advert-link-row {
    div {
        width: 20%;
        &:first-of-type {
            width: 79% !important;
        }
    }
}
.add-link {
    padding: 16px 0px;
    color: $primary;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
}
.form-input {
    @include plain-form-input;
}
.button {
    @include smallbutton;
    min-height: auto;
    height: auto;
    width: auto;
    padding: 8px 16px;

}
</style>