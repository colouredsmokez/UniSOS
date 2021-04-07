<template>
    <div class="background">
    <div class="flex-container">
        <div class="flex-child-bio">
            <p>User Info</p>
        </div>  
        <div class="flex-child-chat">
            <div class="chat">
                <div class="chat-view">
                    <div v-for="message in messages" v-bind:key="message.id">
                        <div v-if="message.author == thisData.name">
                            <div class="msg" style="float:right">
                                <span class="msg-user"> You </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <p class="msg-content"> {{message.message}} </p>
                            </div>
                        </div>
                        <div v-if="message.author == otherData.name">
                            <div class="msg" style="float:left">
                                <span class="msg-user"> {{message.author}} </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <p class="msg-content"> {{message.message}} </p>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                        <!--
                        <span v-if="message.author === 'this.thisData.name'" class="msg-user"> You </span>
                        <span v-else class="msg-user"> {{message.author}} </span>
                        <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                        <p class="msg-content"> {{message.message}} </p>
                        -->
                    </div>
                </div>
            </div>
            <div class="input">
                <div class="input-upload">
                    <button class="input-upload-btn"></button>
                </div>
                <textarea class="input-text" v-model="message" type="text" placeholder="Type a message"/><!--@keyup.enter="saveMessage()"-->
                <div class="input-enter">
                    <button class="input-enter-btn" v-on:click="saveMessage()"> <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { db } from "../../firebase"
import { auth } from '../../firebase';

export default {
    data() {
        return {
            message: null,
            messages: [],
            thisUser: auth.currentUser.uid,
            thisData: null,
            otherUser: this.$route.params.uid,
            otherData: null
        }
    },
    methods: {
        saveMessage() {
            let data = {
                message: this.message,
                author: this.thisData.name,
                createdAt: new Date()
            }
            console.log(data);
            db.collection('chat').doc(this.thisUser).collection(this.otherUser).add(data).then(() => {
                db.collection('chat').doc(this.otherUser).collection(this.thisUser).add(data).then(() => {
                    this.message = null;
                });
            });
        },
        fetchMessages() {
            alert(this.otherUser);
            db.collection('chat').doc(this.thisUser).collection(this.otherUser).orderBy('createdAt').onSnapshot((querySnapshot) => {
                let allMessages = [];
                querySnapshot.forEach(doc => {
                    allMessages.push(doc.data())
                });
                this.messages = allMessages;
            });
        },
        timeSent(d) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            var date = d.getDate();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mth = d.getMonth();
            var h = addZero(d.getHours());
            var m = addZero(d.getMinutes());
            return String(date) + " " + months[mth] + ", " + String(h) + ":" + String(m);
        }
    },
    created() {
        db.collection('users').doc(this.thisUser).get().then(snapshot => {
            this.thisData = snapshot.data();
        });
        db.collection('users').doc(this.otherUser).get().then(snapshot => {
            this.otherData = snapshot.data();
        });
        this.fetchMessages();
    }
}
</script>

<style scoped>
    .background {
        background: #47E4E4;
        margin: auto;
        padding: 30px;

    }
    .flex-container {
        display: flex;
        font-family: sans-serif;
        background: white;
        border-radius: 30px 0px 0px 30px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        height: 70vh;
    }
    .flex-child-bio {
        flex: 2;
        padding: 30px;
        border-right: black solid;
    }
    .flex-child-chat {
        flex: 3;
    }
    .chat {
        height: 60vh;
        padding: 0px 0px 0px 20px;
    }
    .chat-view {
        padding: 20px 20px 0px 0px;
        height: 95%;
        overflow-y: auto;
    }
    .msg {
        padding: 10px;
    }
    .msg-user {
        color:#05728f;
        font-size: 13px;
        font-weight: bold;
    }
    .msg-time {
        color: #747474;
        font-size: 10px;
    }
    .msg-content {
        background: #ebebeb none repeat scroll 0 0;
        padding: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 5px;
        font-size: 16px;
        margin:0;
    }
    .input {
        height:10vh;
        display: flex;
        text-align: center;
        align-items: center;
    }
    .input-upload {
        flex: 1;
    }
    .input-upload-btn {
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .input-text {
        flex: 8;
        height:50%;
        color: #4c4c4c;
        font-size: 15px;
    }
    .input-enter {
        flex: 1;
    }
    .input-enter-btn {
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
</style>