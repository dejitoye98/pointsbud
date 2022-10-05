<template>
    <div class="">
        <p>{{error}}</p>
    </div>

</template>


<script>
import axios from 'axios';
const API_URL = process.env.REDIR_LINK_VERIFY_API || '//localhost:4000'
export default {
    data() {
        return {
            slug: this.$route.params.slug,
            error: ''
        }
    },
    methods: {
        getLink() {
            const url = API_URL + '/links/' + this.slug;
            axios.get(url).then(resp=> {
                if (resp.data.data) {

                    window.location.replace(resp.data.data)
                }
            }).catch(err=> {
                this.error = "Error. Please contact creator"
            })
        }
    },
    created() {
        this.getLink()
    },
    

}
</script>