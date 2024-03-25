<template> 
    <div class="image" style="position: relative;">
        <div class="erase" @click.stop style="position: absolute; bottom: 16px; right: 16px;">
            <svg @click="erase" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
            <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
        </svg>
        </div>
        <input id="image-input" type="file" @change="addImage" accept="image/*">
        <div id="image-placeholder" class="placeholder">

            <svg v-if="!image_address" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13.0009C18.7348 13.0009 18.4804 13.1062 18.2929 13.2938C18.1054 13.4813 18 13.7357 18 14.0009V14.3809L16.52 12.9009C15.9974 12.3824 15.2911 12.0915 14.555 12.0915C13.8189 12.0915 13.1126 12.3824 12.59 12.9009L11.89 13.6009L9.41 11.1209C8.88012 10.6165 8.17657 10.3352 7.445 10.3352C6.71343 10.3352 6.00988 10.6165 5.48 11.1209L4 12.6009V7.00087C4 6.73566 4.10536 6.4813 4.29289 6.29377C4.48043 6.10623 4.73478 6.00087 5 6.00087H12C12.2652 6.00087 12.5196 5.89552 12.7071 5.70798C12.8946 5.52044 13 5.26609 13 5.00087C13 4.73566 12.8946 4.4813 12.7071 4.29377C12.5196 4.10623 12.2652 4.00087 12 4.00087H5C4.20435 4.00087 3.44129 4.31694 2.87868 4.87955C2.31607 5.44216 2 6.20522 2 7.00087V19.0009C2 19.7965 2.31607 20.5596 2.87868 21.1222C3.44129 21.6848 4.20435 22.0009 5 22.0009H17C17.7956 22.0009 18.5587 21.6848 19.1213 21.1222C19.6839 20.5596 20 19.7965 20 19.0009V14.0009C20 13.7357 19.8946 13.4813 19.7071 13.2938C19.5196 13.1062 19.2652 13.0009 19 13.0009ZM5 20.0009C4.73478 20.0009 4.48043 19.8955 4.29289 19.708C4.10536 19.5204 4 19.2661 4 19.0009V15.4309L6.9 12.5309C7.04691 12.3909 7.24206 12.3128 7.445 12.3128C7.64794 12.3128 7.84309 12.3909 7.99 12.5309L11.16 15.7009L15.46 20.0009H5ZM18 19.0009C17.9986 19.1923 17.9354 19.3782 17.82 19.5309L13.31 15.0009L14.01 14.3009C14.0817 14.2277 14.1673 14.1696 14.2617 14.1299C14.3561 14.0902 14.4576 14.0698 14.56 14.0698C14.6624 14.0698 14.7639 14.0902 14.8583 14.1299C14.9527 14.1696 15.0383 14.2277 15.11 14.3009L18 17.2109V19.0009ZM22.71 4.29087L19.71 1.29087C19.6149 1.19983 19.5028 1.12847 19.38 1.08087C19.1365 0.980855 18.8635 0.980855 18.62 1.08087C18.4972 1.12847 18.3851 1.19983 18.29 1.29087L15.29 4.29087C15.1017 4.47918 14.9959 4.73457 14.9959 5.00087C14.9959 5.26717 15.1017 5.52257 15.29 5.71087C15.4783 5.89918 15.7337 6.00496 16 6.00496C16.2663 6.00496 16.5217 5.89918 16.71 5.71087L18 4.41087V10.0009C18 10.2661 18.1054 10.5204 18.2929 10.708C18.4804 10.8955 18.7348 11.0009 19 11.0009C19.2652 11.0009 19.5196 10.8955 19.7071 10.708C19.8946 10.5204 20 10.2661 20 10.0009V4.41087L21.29 5.71087C21.383 5.8046 21.4936 5.879 21.6154 5.92976C21.7373 5.98053 21.868 6.00667 22 6.00667C22.132 6.00667 22.2627 5.98053 22.3846 5.92976C22.5064 5.879 22.617 5.8046 22.71 5.71087C22.8037 5.61791 22.8781 5.50731 22.9289 5.38545C22.9797 5.26359 23.0058 5.13288 23.0058 5.00087C23.0058 4.86886 22.9797 4.73816 22.9289 4.6163C22.8781 4.49444 22.8037 4.38384 22.71 4.29087Z" fill="black"/>
            </svg>
                
        </div>
            
        <img v-if="uploaded" :src="image_address">
        
        <div class="loadingcontainer">
            <div id="loading" v-if="uploading_image" class="loading"></div>
        </div>
    </div>

</template>

<script> 
import axios from "axios";
export default {
    props: ["link", "image_index",, "product_index"],
    data() {
        return {
            signed_url: "",
            image_address: "",
            uploading_image: false,
            uploaded: false,
        }
    },
    mounted() {

        document.getElementById('image-placeholder').addEventListener('click', function(){
            //alert('clicked')
            document.getElementById('image-input').click()
        })
    },
    methods: {
        async setUpLoader() {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.width = "10px"

                let width = parseInt(loading.style.width);
                alert(width)

                while (width < 100) {
                    loading.style.width = (width + 10) + "px";
                    width = loading.style.width
                }
            }
        },
        async addImage(e) {
            try{ 
                await this.getSignedUrl();
                this.uploaded = false;
                this.uploading = false;
                let input = e.target;
                const file = input.files && input.files[0];
                let url = this.signed_url;
                this.uploading_image = true;
                this.setUpLoader()


                const formData = new FormData();
                formData.append("file", file);
                //rl = url.split('?')[0]
                const result = await axios.put(url, file, {
                    headers: {
                        "Content-Type": 'image/*'
                    }
                })
                this.image_address = this.signed_url.split('?')[0]
                this.uploaded = true;
                this.uploading = true;
                this.uploading_image = false;

                this.$emit('onUploaded', {image: this.image_address,  product_index: this.product_index, image_index: this.image_index})

                //alert(response)
                //set the this.image_address
            }catch(e) {
                console.log(e);
                alert("Error")
            }
            
            
            
        },
        async getSignedUrl() {
            try {

                const result = await this.$api.get('/media/signed-url');
                this.signed_url = result.data.data;
            
            }catch(e) {
                console.log(e)
                
                
            }
            
        },
        erase() {
            this.image_address = ''
        }
    },

    computed:{ 
    
    }
}
</script>

<style lang="scss" scoped>

.loadingcontainer {
    position: absolute;
    bottom: 5px;
    left: 0;
    //border: 1px solid grey;
    background-color: transparent;
    padding: 2px 10px;

    .loading{
        //height: 20px;
       // background-color: $secondaryaccent;
       // width: 5px;
        border-radius: 20px;
    }
}
.image {
    position: relative;
    height: 150px;

    .placeholder {
        height: 150px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;

        background: #F3F3F3;
        padding: 16px;
        border-radius: 5px;
        svg {
            width: 100%;
            height: 100px;
        }
    }

    img{
        position: absolute;
        top: 0;
        left: 0;
        height: 150px;
        width: 150px;
        object-fit: cover;
        //border: 1px solid rgb(181, 189, 196);
        border-radius: 5px;

    }
    input {
        opacity: 0;
        height: 150px;
        width: 100%;
        position: absolute;
        z-index: 100000;
        cursor: pointer;
        top: 0;
        left: 0;
    }
}

</style>