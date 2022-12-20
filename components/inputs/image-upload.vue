<template>
  <div class="container">
    <div class="image">
      <input @change="addImage" type="file" accept="image/*" />

      <img
        :id="'image-display-' +image_index + '-' + product_index"
        v-if="local_link"
        :src="local_link"
        alt
      />
      <img
        :id="'grayscale-'+image_index + '-' + product_index"
        class="grayscale"
        v-else
        src="../../static/image-upload.svg"
      />
      <label for v-if="!local_link && !label">Upload image</label>
      <label for v-else-if="!local_link && label">{{label}}</label>
      <label for v-else>Edit image</label>
    </div>
  </div>
</template>


<script>
export default {
  props: ["link", "image_index", "label", "product_index"],
  data() {
    return {
      local_link: ""
    };
  },
  watch: {
    link(value) {
      this.local_link = value;
    }
  },
  mounted() {
    if (this.link) {
      this.local_link = this.link;
    }
  },
  methods: {
    addImage(e) {
      let input = e.target;
      let image_display_loading = document.querySelector(
        "#grayscale-" + this.image_index + "-" + this.product_index
      );
      let image_display = document.querySelector(
        "#image-display-" + this.image_index + "-" + this.product_index
      );

      const file = input.files && input.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        image_display_loading.src = e.target.result;
      };

      reader.readAsDataURL(file);

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
          vm.local_link = response.secure_url;
          vm.$emit("onImageUploaded", {
            image: response.secure_url,
            product_index: vm.product_index,
            image_index: vm.image_index
          });

          //vm.campaign.thumbnail = response.secure_url
        };

        fd.append("upload_preset", "jljh5lxc");
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", file);
        xhr.send(fd);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grayscale {
  filter: grayscale(1);
  background: rgba(128, 128, 128, 0.404);
  border-radius: 1px;
  //height: 200px;
  width: 200px;
}

.image {
  position: relative;
  height: 200px;

  img {
    height: 100%;
    object-fit: contain;
  }
  input {
    opacity: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100000;
    cursor: pointer;
  }
  label {
    z-index: 200;
    position: absolute;
    left: 0;
    cursor: pointer;
    bottom: 0;
    width: 100%;
    display: block;
    text-align: center;
    background: grey;
    color: white;
    font-size: 400;
    font-size: 15px;
    &:hover {
      font-size: 600;
      color: black;
      font-size: 16px;
    }
  }
}
</style>
