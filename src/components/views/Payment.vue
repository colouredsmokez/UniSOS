<template>
    <div>
        <router-link to="/listings" exact><img id="cross" src="../../assets/X.png" alt="X"></router-link>
        <div id="page">
            <div v-if="notes">Payment for Notes</div>
            <div v-if="!notes">Payment for Advertisement</div>
            <br>
            <img src="../../assets/QR.png" alt="QR">
            <br>
            <button v-if="notes" v-on:click="buy()">Confirm Payment</button>
            <button v-if="!notes" v-on:click="advertise()">Confirm Payment</button>
        </div>
    </div>
</template>
<script>
import { db } from '../../firebase'
import { auth } from '../../firebase'

export default {
    data() {
        return{
            itemid: this.$route.params.itemid,
            notes: this.$route.params.notes
        }
    },
    methods: {
        buy: function() {
            db.collection('listing').doc(this.itemid).get().then(itemDoc => {
                var item = itemDoc.data();
                db.collection('users').doc(auth.currentUser.uid).get().then(snapshot => {
                    var cfm = confirm("Made payment of $" + item.price + "?");
                    if (cfm) {
                        var myNotes = snapshot.data().myNotes;
                        var id = this.itemid;
                        if (myNotes == null) {
                            myNotes = {}
                        }
                        myNotes[id] = {} 
                        myNotes[id].imageURL = item.img;
                        myNotes[id].title = item.title;
                        myNotes[id].ownerid = item.userId
                        db.collection('users').doc(auth.currentUser.uid).update({myNotes:myNotes}).then(() => {
                            this.$router.push({ name:'mynotes' });
                        });
                    } else {
                        alert("You cancelled your purchase.");
                    }
                });
            });
        },
        advertise: function() {
            var id = this.itemid;
            var cfm = confirm("Made payment of $5?");
            if (cfm){
                db.collection('listing').doc(id).update({advertise: true}).then(() => {
                    this.$router.push({ name:'listings' });
                });
            } else {
                alert("Transaction cancelled.");
            }
        }
    }
}
</script>

<style scoped>
#page {
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 25px;
}
</style>
