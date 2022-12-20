<template>
    <Modal  classes="full-mask half-body" title="Product Images" @close="$emit('close')">

        <div class="dialog">
            <input type="file" id="image-input" accept="image/*" multiple style="visibility:hidden"/>
            <div class="dialog__container">
                <div class="dialog__side">
                    <div class="dialog__side__item">Recent Pictures</div>
                </div>

                <div class="dialog__body">
                    <div class="images">
                        <div class="image" v-for="(image, index) in images" :key="index">
                            <div class="img-container">
                                <div class="image-remove">
                                    <svg width="16" height="16" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round"/>
                                    <path d="M7 1L1 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <img :src="image.image" :class="[image.uploading? 'image-uploading' :'']" alt="">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="dialog__footer">

                <button @click="selectFiles">Add Image</button>
                <button @click="uploadImages">Upload Images</button>
            </div>
        </div>

    </Modal>
    
</template>


<script>
import Modal from '../Modal'
export default {
    components: {
        Modal
    },
    props: ['product_index', 'show'],

    data() {
        return {
            images: [],
            tempImages: [{
                image: '',
                loading: true
            }]
        }

    },
    methods: {
        uploadImages() {
            this.$emit('onImagesSelected', {images:  this.images, product_index: this.product_index})
            this.$emit('close')
        },
        removeImage(index) {
            this.images.splice(index, 1);
        },
        selectFiles() {
            const hidden_input = document.getElementById('image-input');
            hidden_input.click();
            

            // get file from hidden input
            hidden_input.addEventListener('change', (e) => {
                e.stopImmediatePropagation()
                e.stopPropagation()
                if(hidden_input.files && hidden_input.files.length > 0) {
                    for (let i = 0; i < hidden_input.files.length; i++ ) {

                        const file = hidden_input.files[i];
    
                        var reader = new FileReader();
                        reader.onload = ()=> {
                           
                            if (!this.images.includes(reader.result)) {
                                this.images.push({image: reader.result, uploading: true, url: ''})

                            

                            const cloudinary_url = "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
                                try {

                                    var xhr = new XMLHttpRequest();
                                    var fd = new FormData();
                                    const vm = this;
                                    
                                    
                                    xhr.open('POST', cloudinary_url, true);        
                                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        
                                    xhr.onreadystatechange = function(e) {
                                        if (xhr.readyState == 4 && xhr.status == 200) {
                                        // File uploaded successfully
                                            var response = JSON.parse(xhr.responseText);
                                                vm.images[i].url = response.secure_url
                                                vm.images[i].uploading =false;
                                                vm.$emit('onImageUpdated', {product_index: vm.product_index, image: this.image})
                                        }
                                    }
                                    
                                    
                                    fd.append('upload_preset', "jljh5lxc");
                                    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                                    fd.append('file', file);
                                    xhr.send(fd);
                                }catch(e) {
                                    console.log('ser')
                                }
                            } 
    
                            // start upload
                           /* if (result) {
                                 vm.campaign.products.list[product_index].temp_images[i].loading = false
                            }*/
                        } 
                        reader.readAsDataURL(hidden_input.files[i]);
                    }
                    
                }
            })
        },
        uploadImage(file) {
            const vm = this;

            const cloudinary_url = "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
            try {

                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                const vm = this;
                
                
                xhr.open('POST', cloudinary_url, true);        
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                    // File uploaded successfully
                        var response = JSON.parse(xhr.responseText);
                    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                    }
                
                    //const displayElement = document.createElement('img');
                    //displayElement.src = response.secure_url
                    //editor.append(displayElement)
                    //vm.campaign.thumbnail = response.secure_url
                }
    
                fd.append('upload_preset', "jljh5lxc");
                fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                fd.append('file', file);
                xhr.send(fd);
            } 
            catch(e) {
                console.log(e)
            }
        }
        
    }
    
}
</script>

<style lang="scss" scoped>
.image-uploading {
    filter: grayscale(1)
}
.dialog {
    &__container {
        display: flex;
        height: 100%;
        padding: 24px 0;
        

    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        button {
            @include smallbutton;
        }
    }

    &__side {
        min-width: 20%;
        background: white;

        &__item {
            padding: 8px 8px;
            color: $faint;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                background: $dashboard-background-color;
            }
        }
    }
    &__body{
        background: $dashboard-background-color;
        height: 100%;
        width: 100%;
        padding: 16px;
        min-height:300px;
        .images{

            display: grid;
            grid-template-columns: 19% 19% 19% 19% 19%;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            position: relative;
        } 

        .image {
            position: relative;
            height: 100%;
            width: 100%;
            //border: 1px solid green;

            .img-container {
                position: relative;
                left: 0;
                bottom: 0;
                
                .image-remove {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: rgb(247, 241, 241);
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 4px;
                    border: 1px solid white;
                    cursor: pointer;
                }

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    position: relative;
                    left: 0;
                    bottom: 0;
                }
            }

        }   
        
    }

}
</style>