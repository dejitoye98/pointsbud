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
                    <div class="form-input">
                        <label for="">Point</label>
                        <textarea v-model="point.point" placeholder="mention the potential of the petitioner's  work/proposed endeavor as it relates to the US"></textarea>
                    </div>

                    <div class="form-input">
                        <label for="">No. of paragraphs</label>
                        <input v-model="point.paragraphs" inputmode="numeric">
                    </div>


                </div>


                <div class="button">
                    <button class="plain-btn" @click="addPoint">Add new point</button>
                </div>
                
               
            </div>
        </template>

        <template #footer>

            <div class="footer">
                <button v-if="!mode || mode ==='create'" @click="createTemplate">Create template</button>
                <button v-else-if="mode === 'edit'">Edit Template</button>
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
            name: "",
            points: [{point: '', paragraphs: 1}]
        }
    },
    methods: {
        addPoint() {
            this.points.push({point: '', paragraphs: 1})
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
            this.$api.put('/recommendation-template/' + this.data?.id,  {
                name: this.name,
                data: this.points,

            }).then(resp=> {
                this.$emit('editedTemplate', true);
                this.$emit('close', true)
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