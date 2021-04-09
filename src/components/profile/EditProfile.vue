<template>
    <div>
    </div>
</template>

<script>
// import * as data from 'https://api.nusmods.com/v2/2020-2021/moduleList.json'
import { db } from '../../firebase';

export default {
    data() {
        return {
            datapacket: {},
            // modules: data
        }
    },
    methods: {
        fetchItems: function() {
            db.collection('users').doc(this.uid).get().then((snapshot)=>{
                this.datapacket = snapshot.data();   
            })
        },
        updateProfile: function(attr) {
            var newData = {}
            for (var info in this.datapacket) {
                newData[info] = info.value
            }
            var newVal = document.value;
            if (newVal !== '') {
                newData[attr] = newVal;
            }
            db.collection('users').doc(this.uid).update(newData).then(() => this.$router.push('myprofile'))
        }
    }
}
</script>

<style scoped>

</style>