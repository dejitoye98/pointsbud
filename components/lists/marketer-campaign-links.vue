<template>
<div>

    <ShareCampaignLinkModal @close="show_share_modal = false" :advert_note="share.advert_note" :link="share.link"  v-if="show_share_modal"/>


    <template v-if="data && data.length > 0">
        <table>
            <tr class="header-row"> 
                <th>Personal Link</th>
                <th>Redirect</th>
                <th>Product</th>
                <th>Pay Per Click</th>
                <th>Pay Per Sale</th>
                <th></th>
            </tr>

              <tr v-for="(data, index) in data" :key="index">
                  <td class="personal-link" data-th="Personal Link">{{getPersonalLink(data)}}</td>
                  
                  <td data-th="Redirect" v-if="isAffleeLink(data.link)">afflee.com{{data.link}}</td>
                  <td  data-th="Redirect" v-else>{{data.link}}</td>
                  <td data-th="Product">{{data.product && data.product.name || '-'}}</td>
                  <td data-th="Pay Per Click">{{data.pay_currency || "NGN"}} {{data.pay_per_click && data.pay_per_click}}</td>
                  <td data-th="Pay Per Sale">{{data.pay_currency || "NGN"}} {{data.pay_per_sale && data.pay_per_sale}}</td>
                  
                  <td style="display: flex;" class="table-ctas">
                      <button class="view-btn" @click="viewLink(data)" v-if="data.product">View Product</button>
                      <button class="view-btn" @click="viewLink(data)" v-else>View</button>
                      <button class="share-btn" @click="triggerShare(data)">Share</button>
                  </td>
              </tr>


           
            
        </table>
    </template>

    <template v-else>

          <LoadingState/>

    </template>
</div>

     
</template>



<script>
export default {
    props: [ 'campaign'],
    data() {
        return {
            show_share_modal: false,
            share_campaign_link_modal: true,

            data: {},
            share:{
              link: '',
              advert_note: ''
            }
        }
    },

    computed: {
      
    },
    watch: {
      campaign() {
        this.getCampaignLinks()
      }
    },
    mounted() {
        this.getCampaignLinks()
    },

    methods:{ 
        triggerShare(data) {
          this.share.link = this.getPersonalLink(data);
          this.share.advert_note = data.product.advert_note ||  this.campaign.advert_note;
          this.show_share_modal = true;
        },
        getPersonalLink(data) {
          const host = data.host || 'afflee.com/'
          return host + data.redir_link;

        },
        viewLink(link) {
            if (link && link.product) {
                this.$router.push(`/dashboard/products/${link.product.id}`)
            }
            else {
                
            }
        },
        isAffleeLink(link) {
            return link[0] === '/'
        },
        getCampaignLinks() {
            this.loading = true;
            this.$api.get(`campaigns/${this.campaign.id}/links`).then(resp=> {
                this.data = resp.data.data;
            }).catch(err=> {
                
            }).finally(()=> {
              this.loading = false;
            })
        }
    }
    
}
</script>


<style lang="scss" scoped>
.personal-link {
  color: $primary;
}
$breakpoint-alpha: 1009px; 

button {
    @include editbutton;
}


.table-ctas {
    button {
        &:first-of-type{
            margin-right: 8px;;
        }
    }
}
.share-btn {
    background: $primary !important;
    border: 0;
    color: white;
    &:hover {
        color: grey;
        border: 0;

    }
}

.header-row {
    border-bottom: 1px solid rgba(211, 211, 211, 0.331);

}
table {
  background: white;
  color:$faint;
  border-radius: .4em;
  overflow: hidden;
  font-size: 15px !important;
 //border: 0.5px solid rgba(211, 211, 211, 0.368);

  tr {
    border-color: rgba(211, 211, 211, 0.368);
    cursor: pointer;

    
  }
  th, td {
    margin: .5em 1em;
    @media (min-width: $breakpoint-alpha) { 
      padding: 1em !important; 
    }
  }
  th, td:before {
    //color: grey;
    color: black;
    font-weight: 400;
  }
}
table {
  margin: 1em 0;
  min-width: 100%; // adjust to your needs
  //color: lightgrey;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    //orund:white;

  tr {
    //border-top: 1px solid #ddd;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.136);
    &:last-of-type {
        border-bottom: 0;
    }
  }
  
  th {
    min-height: 55px !important;
    display: none; // for accessibility, use a visually hidden method here instead! Thanks, reddit!   
  }
  
  td {
    display: block; 
    
    &:first-child {
      padding-top: .5em;
    }
    &:last-child {
      padding-bottom: .5em;
    }

    &:before {
      content: attr(data-th)": "; // who knew you could do this? The internet, that's who.
      //font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options
      
      @media (min-width: $breakpoint-alpha) {
        display: none;
      }
    }
  }
  
  th, td {
    text-align: left;
    
    @media (min-width: $breakpoint-alpha) {
      display: table-cell;
      padding: .25em .5em;
      
      &:first-child {
        padding-left: 0;
      }
      
      &:last-child {
        padding-right: 0;
      }
    }

  }
  
}

</style>