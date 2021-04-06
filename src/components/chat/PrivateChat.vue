<template>
    <div class="container">
        <div class="messaging">
            <div class="inbox_msg">
                <div class="inbox_people">
                    <div class="headind_srch">
                        <div class="recent_heading">
                            <h4>Recent</h4>
                        </div>
                        <!-- <div class="srch_bar">
                            <div class="stylish-input-group">
                                <input type="text" class="search-bar"  placeholder="Search" >
                                <span class="input-group-addon">
                                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                                </span>
                            </div>
                        </div> -->
                    </div>
                    <div class="inbox_chat">
                        <div class="chat_list active_chat" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                    <h5>Sunil Testing <span class="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                                </div>
                             </div>
                        </div>
                        <div class="chat_list" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                    <h5> Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat_list" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png"> </div>
                                <div class="chat_ib">
                                    <h5> Susan <span class="chat_date">Dec 25</span></h5>
                                    <p> Still Available? </p>
                                </div>
                            </div>
                        </div>
                        <div class="chat_list" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                    <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                    <p> Hello hello hello.</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat_list" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                    <h5>Jane Doe <span class="chat_date">Dec 23</span></h5>
                                    <p> Hello. </p>
                                </div>
                            </div>
                        </div>
                        <div class="chat_list" @click="clickChat($event)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                    <h5> Ranjit <span class="chat_date">Dec 22</span></h5>
                                    <p>Test, which is a new approach to have all solutions 
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mesgs">
                    <div class="msg_history">
                        <div v-for="message in messages" v-bind:key="message" class="incoming_msg">
                            <div class="received_msg">
                                <div class="received_withd_msg">
                                    <span v-if="message.author === 'this.authUser.name'" class="time_date_b"> You </span>
                                    <span v-else class="time_date_b"> {{message.author}} </span>
                                    <span class="time_date"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                    <p> {{message.message}} </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <input @keyup.enter="saveMessage()" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                            <button class="msg_send_btn" type="submit"> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase.js"
import { auth } from '../../firebase';

export default {
    name: 'PrivateChat',
    data() {
        return {
            message:null,
            messages: [],
            authUser:null,
        }
    },
    methods: {
        saveMessage() {
            // DocumentReference ref = db.collection('chat').doc();
            // String myId = ref.id;
            db.collection('chat').add({
                message: this.message,
                author: this.authUser.name,
                createdAt: new Date()
            })
            this.message = null;
            console.log(this.author)
        },
        fetchMessages() {
            db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
                let allMessages = [];
                querySnapshot.forEach(doc => {
                    allMessages.push(doc.data())
                })
                this.messages = allMessages;
            })
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
        }, 
        clickChat: function(event) {
            console.log("clicked");
            // console.log(event.target.tagName);

            // make the rest inactive
            var elements = document.getElementsByClassName("chat_list");
            for (var i = 0, len = elements.length; i < len; i++) {
                elements[i].className = "chat_list";
            }

            if (event.target.tagName == "DIV") {
                event.target.className = "chat_list active_chat";
            }

            // console.log(event.target.parentElement.parentElement.parentElement);
            if (event.target.tagName == "H5") {
                event.target.parentElement.parentElement.parentElement.className = "chat_list active_chat";
            } 

            // refresh code 
            this.messages = []
            //this.fetchMessages();
        }
    },
    created() {
        db.collection('users').doc(auth.currentUser.uid).get().then(snapshot => {
            this.authUser = snapshot.data();
        });
        this.fetchMessages();
    }
}
</script>

<style scoped>
    .container{
        max-width:1170px;
        margin:auto;
        font-family: Arial;
        padding-top: 20px;
    }
    img{ max-width:100%;}
    .inbox_people {
        background: #f8f8f8 none repeat scroll 0 0;
        float: left;
        overflow: hidden;
        width: 35%;
        border-right:1px solid #c4c4c4;
    }
    .inbox_msg {
        border: 1px solid #c4c4c4;
        clear: both;
        overflow: hidden;
    }
    .top_spac{ margin: 20px 0 0;}


    .recent_heading {float: left; width:40%;}
    /* .srch_bar {
        display: inline-block;
        text-align: right;
        width: 60%;
    } */
    .headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

    .recent_heading h4 {
        color: #05728f;
        font-size: 21px;
        margin: auto;
    }
    .srch_bar input{
        border:1px solid #cdcdcd;
        border-width:0 0 1px 0;
        width:80%;
        padding:2px 0 4px 6px;
        background:none;
    }
    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
        padding: 18px;
    }
    .srch_bar .input-group-addon { margin: 0 0 0 -27px;}

    .chat_ib h5{ font-size:16px; color:#464646; margin:0 0 8px 0;}
    .chat_ib h5 span{ font-size:13px; float:right;}
    .chat_ib p{ font-size:16px; color:#989898; margin:auto}
    .chat_img {
        float: left;
        width: 10%;
    }
    .chat_ib {
        float: right;
        padding: left;
        width: 88%;
    }
    .chat_people{ overflow:hidden; clear:both;}
    .chat_list {
        border-bottom: 1px solid #c4c4c4;
        margin: 0;
        padding: 18px 16px 10px;
        cursor: pointer;
    }
    .inbox_chat { height: 550px; overflow-y: scroll;}

    .active_chat{ background:#ebebeb;}

    .incoming_msg_img {
        display: inline-block;
        width: 6%;
    }
    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
    }
    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        color: #646464;
        border-radius: 3px;
        font-size: 16px;
        margin: 0;
        padding: 10px;
        width: 100%;
    }
    .time_date_b {
        color:#05728f;
        font-size: 13px;
        margin: 8px 0 0;
        font-weight: bold;
    }
    .time_date {
        color: #747474;
        font-size: 10px;
        margin: 8px 0 0;
    }
    .received_withd_msg { width: 57%; padding:5px;}
    .mesgs {
        float: left;
        padding: 30px 15px 0 25px;
        width: 60%;
    }

    .sent_msg p {
        background: #05728f none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0; color:#fff;
        padding: 5px 10px 5px 12px;
        width:100%;
    }
    .outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
    .sent_msg {
        float: right;
        width: 46%;
    }
    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 100%;
    }

    .type_msg {border-top: 1px solid #c4c4c4;position: relative;}
    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 15px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 11px;
        width: 35px;
    }
    .messaging { padding: 0 0 50px 0;}
    .msg_history {
        height: 516px;
        overflow-y: auto;
    }
</style>