<template>
    <div>
        <template v-if="!records">
            <table class="table">
                <tr>
                    <th>Movie Title</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Gross</th>
                </tr>
                <tr>
                    <td data-th="Movie Title">Star Wars</td>
                    <td data-th="Genre">Adventure, Sci-fi</td>
                    <td data-th="Year">1977</td>
                    <td data-th="Gross">$460,935,665</td>
                </tr>
                <tr>
                    <td data-th="Movie Title">Howard The Duck</td>
                    <td data-th="Genre">"Comedy"</td>
                    <td data-th="Year">1986</td>
                    <td data-th="Gross">$16,295,774</td>
                </tr>
                <tr>
                    <td data-th="Movie Title">American Graffiti</td>
                    <td data-th="Genre">Comedy, Drama</td>
                    <td data-th="Year">1973</td>
                    <td data-th="Gross">$115,000,000</td>
                </tr>
            </table>
            <pagination :records="10000" v-model="page" :per-page="100" @paginate="callback"></pagination>
        </template>
        <template v-else>
            <table class="table">
                <tr>
                    <th v-for="label in Object.keys(labels)" :key="label">{{label}}</th>
                </tr>
                <tr v-for="(record, index) in records" :record="record" :key="index">
                    <td  v-for="label in Object.keys(labels)" :key="label" data-th="label">{{format(label, record)}}</td>
                </tr>
                
            </table>
            <pagination :records="pagination && pagination.total || 0" v-model="page" :per-page="pagination.page_size" @paginate="callback"></pagination>
        </template>
    </div>

</template>


<script>
import Pagination from 'vue-pagination-2';
import moment from "moment";
export default {
    components: {
        Pagination
    },
    props: [ 'labels', 'records', 'pagination', 'item_link'],
    data(){
        return {
            page: this.pagination && this.pagination.current_page || 1
        }
    },
    methods: {
        callback() {
            return ''
        },
        formatDate(date) {
            return moment(date).format("DD MMM, yyyy") 
        },
        format(label, record) {
            if (this.labels) {
                let value = record[this.labels[label]['property']] ;
                if (this.labels[label] && this.labels[label]['type'] === 'date') {
                    //value = record[this.labels[label]['property']]
                    value =  this.formatDate(value)
                }

                return value
            }
        },
        goToRedirLink(record) {
            if (this.item_link) {
                let split = this.item_link.split(":");
                let param = split[split.length - 1];
                param = param && param || ''

                if (!param) {

                }
                else {
                    this.$router.push({
                        path: `${split[0]}/${record[param]}`
                    })
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>


:deep(.pagination) {
    display: flex;
    width: auto;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
   // margin: 3rem;
    border-radius: 0.6rem;
    //background: #ffffff;

    ul {
        height: auto;
        //box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    }
    li {
        background: white;
        //border: 1px solid grey;
        cursor: pointer;
        color: grey;
        width: 2.6rem;
        height: 2.6rem;
        //border-radius: 0.4rem;
        //background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);

    } 
    p {
        color: grey;
        font-size: 14px;
    }

}



:deep(.VuePagination) {
    p {
        color: grey;
        font-size: 14px;
    }  
}



// More practical CSS...
// using mobile first method (IE8,7 requires respond.js polyfill https://github.com/scottjehl/Respond)

$breakpoint-alpha: 480px; // adjust to your needs

.table {
  margin: 1em 0;
  min-width: 100%; // adjust to your needs
  //color: lightgrey;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);

  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  th {
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
      font-weight: bold;

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


// presentational styling

@import 'https://fonts.googleapis.com/css?family=Montserrat:300,400,700';

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495E;
}

.table {
  background: white;
  color:$faint;
  border-radius: .4em;
  overflow: hidden;
  font-size: 15px !important;
 border: 0.5px solid rgba(211, 211, 211, 0.368);

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
    color: grey;
  }
}
</style>