<template>

    <BaseModal @close="$emit('close', true)">
    
        <template #header>
            <div class="header padding-24"> Create Template</div>
            
        </template>

        <template #body> 
            <div class="form padding-24">


                <div class="form-input">
                    <label for="">Template name</label>
                    <input v-model="name">
                </div>



                <div class="" style="margin-top: 40px;">
                    <p class="normal-text">Points to write on</p>
                    
                </div>
                <div class="form-group form-half section" v-for="(point, index) in points">
                    <div style="display: flex; justify-content: flex-end">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="remove(index)">
                            <path d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z" fill="#FF0000"/>
                            </svg>
                            
                    </div>
                    <div class="form-input">
                        <label for="">Point</label>
                        <textarea v-model="point.point" placeholder="mention the potential of the petitioner's  work/proposed endeavor as it relates to the US"></textarea>
                    </div>

                    <div class="form-input">
                        <label for="">No. of paragraphs</label>
                        <input v-model="point.paragraphs" inputmode="numeric">
                    </div>

                    <button style="border: 1px solid grey; background: black; color: white; padding: 8px 16px; border-radius: 5px;" @click="addPoint(index)">+ Add New Point</button>

                </div>


                <div class="button" v-if="false">
                    <button class="plain-btn" @click="addPoint">Add new point</button>
                </div>
                
               
            </div>
        </template>

        <template #footer>

            <div class="footer">
                <button v-if="!mode || mode ==='create'" @click="createTemplate">Create template</button>
                <button v-else-if="mode === 'edit'" @click="editTemplate" :disabled="editing">Edit Template</button>
            </div>

        </template>
    </BaseModal>


</template>

<script>
export default {
    props: ['mode', 'data'],
    created() {
        if (this.mode == 'edit') {

            
            // load points

            if (this.data.data) {
               // alert(JSON.stringify(this.data.data))
                const points = JSON.parse(this.data.data);
                this.name = this.data.name;
                this.points = []
                for (let point of points) {
                    const point_obj = {
                        point: point.point, 
                        paragraphs:  point.paragraphs,
                    }

                    this.points.push(point_obj)
                }
            }
            
        }
    },
    data(){
        return {
            editing: false,
            name: "",
            points: [{point: '', paragraphs: 1}]
        }
    },
    methods: {
        remove(index) {
            this.points.splice(index, 1)
        },
        addPoint(index=false) {
            if (index === false) {

                this.points.push({point: '', paragraphs: 1})
            }
            else{
                // add
                const first_half =this.points.slice(0,index +1);
                const new_stuff = {point: '', paragraphs: 1};
                first_half.push(new_stuff);
                let points_array = first_half.concat(this.points.slice(index + 1))
                this.points = points_array

            }
        },
        createTemplate() {
            this.$api.post('/recommendation-template',  {
                name: this.name,
                data: this.points,

            }).then(resp=> {
                this.$emit('createdTemplate', true);
                this.$emit('close', true)
            })
            
        },
        editTemplate() {
            this.editing = true;
            this.$api.put('/recommendation-templates/' + this.data?.id,  {
                name: this.name,
                data: this.points,

            }).then(resp=> {
                this.$emit('editedTemplate', true);
                this.$emit('close', true);
                
            }).finally(() => {
                this.editing = false;
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>


.normal-text {
    font-family: "open sans", sans-serif !important;
    font-weight: 800 !important;
}

textarea {
    height: 300px;
}

.form-input {
    @include greyforminput;
}

.section {
    border: 1px solid lightgrey;
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 8px;
}


.plain-btn {
    border: 1px solid lightgrey !important;
    font-size: 16px;
    border-radius: 20px;
    padding: 8px 16px;
    margin-top: 20px;
}
</style>