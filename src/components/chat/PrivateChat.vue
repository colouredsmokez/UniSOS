<template>
    <div class="background">
        <div class="flex-container">

            <!--User and Item Info-->
            <div class="flex-child-bio">
                <br>
                <div v-if="otherData.profilepic">
                    <div class="image-cropper">
                        <img :src="otherData.profilepic" alt="profilepic" class="profile-pic">
                    </div>
                </div>
                <div v-else>
                    <div class="image-cropper">
                        <img src="../../assets/defaultpfp.jpg" alt="profilepic" class="profile-pic">
                    </div>
                </div>
                <div class="bio">
                    <h1 class="bio-header" style="margin-bottom:0">{{otherData.name}}</h1>
                    {{otherData.email}}<br>
                    {{otherData.university}}
                    <hr>
                    <h2 class="bio-header">{{itemData.typeOfList}} for {{itemData.module}}</h2>
                    <div class="bio-info">
                        Took in {{itemData.took_in}}<br>
                        and attained a grade of {{itemData.grade}}<br>
                        <br>
                        <strong>Additional Info:</strong><br>
                        {{itemData.addInfo}}
                    </div>
                </div>
            </div>  

            <!--Chat-->
            <div class="flex-child-chat">
                <div class="chat-msg">
                    <br>
                    <div v-for="message in messages" v-bind:key="message.id">
                        <!--From Me-->
                        <div v-if="message.author == thisData.name">
                            <div v-if="message.type == 'text'" class="msg" style="float:right">
                                <span class="msg-user"> You </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">{{message.message}}</div>
                            </div>
                            <div v-if="message.type == 'request'" class="msg" style="text-align:center">
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-noti">
                                    <br>
                                    You made a tuition fee request.
                                    <br><br>
                                </div>
                            </div>
                            <div v-if="message.type == 'review'" class="msg" style="text-align:center">
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-noti">
                                    <br>
                                    <strong>{{otherData.name}}</strong> has agreed to your request.
                                    <br><br>
                                </div>
                            </div>
                        </div>
                        <!--From Other-->
                        <div v-if="message.author == otherData.name">
                            <div v-if="message.type == 'text'" class="msg" style="float:left">
                                <span class="msg-user"> {{message.author}} </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">{{message.message}}</div>
                            </div>
                            <div v-if="message.type == 'request'" class="msg" style="text-align:center">
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-noti">
                                    <br>
                                    <strong>{{message.author}}</strong> has requested a payment of<br>
                                    SGD({{message.fee}}) for their {{message.itemname}} lessons.
                                    <br><br>
                                    <div v-if="message.agreed == false">
                                        <button class="msg-btn" v-bind:id="message.id" v-on:click="agree($event)">Agree?</button>
                                    </div>
                                    <div v-if="message.agreed == true">
                                        <button class="msg-btn" disabled>You have agreed to the request</button>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div v-if="message.type == 'review'" class="msg" style="text-align:center">
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-noti">
                                    <br>
                                    Leave a Review of your experience<br>
                                    with <strong>{{message.author}}</strong>!
                                    <br><br>
                                    <div v-if="message.reviewed == false">
                                        <input type="radio" v-model="rating" value=3>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                        <br>
                                        <input type="radio" v-model="rating" value=2>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                        <br>
                                        <input type="radio" v-model="rating" value=1>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                        <br><br>
                                        <textarea class="review-text" v-model="review" placeholder="Type in your review here..."/>
                                        <br><br>
                                        <button class="msg-btn" v-bind:id="message.id" v-on:click="submit($event)">Submit</button>
                                        <br><br>
                                    </div>
                                    <div v-if="message.reviewed == true">
                                        <input type="radio" v-model="rating" value=3 disabled>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                        <br>
                                        <input type="radio" v-model="rating" value=2 disabled>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                        <br>
                                        <input type="radio" v-model="rating" value=1 disabled>
                                            <img class="review-radio-desc" src="../../assets/goldstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                            <img class="review-radio-desc" src="../../assets/blackstar.png" alt="star">
                                        <br><br>
                                        <button class="msg-btn" disabled>You have made a review</button>
                                        <br><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <br>
                </div>

                <!--input section-->
                <div class="chat-input">
                    <div class="input-left">
                    </div>
                    <div class="input-middle">
                        <textarea class="input-text-field" @keyup.enter="saveMessage()" v-model="message" type="text" placeholder="Type a message"/>
                    </div>
                    <div class="input-right">
                        <button class="input-msg-btn" v-on:click="saveMessage()"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
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
            message: "",
            messages: [],
            thisUser: auth.currentUser.uid,
            thisData: {},
            otherUser: "",
            otherData: {},
            itemid: this.$route.params.id,
            itemData: [],
            showRequestMaker: false,
            requestItem: "",
            requestFee: "",
            requestUnit: "",
            rating:"",
            review:""
        }
    },
    methods: {
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
        saveMessage() {
            if (this.message == "") {
                alert("No Message Entered");
            } else {
                let data = {
                type: "text",
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
                db.collection("users").doc(this.thisUser).get().then(snapshot => {
                    var chatUsers = snapshot.data().chatUsers;
                    if (chatUsers == null) { 
                        chatUsers = {}; 
                    }
                    chatUsers[this.otherUser] = [this.otherUser,this.otherData.name];
                    db.collection("users").doc(this.thisUser).update({chatUsers:chatUsers});
                });
                db.collection("users").doc(this.otherUser).get().then(snapshot => {
                    var chatUsers = snapshot.data().chatUsers;
                    if (chatUsers == null) { 
                        chatUsers = {}; 
                    }
                    chatUsers[this.thisUser] = [this.thisUser,this.thisData.name];
                    db.collection("users").doc(this.otherUser).update({chatUsers:chatUsers});
                });
            }
        },
        agree(event) {
            let docid = event.target.getAttribute("id");
            console.log(docid);
            var cfm = confirm("Are you sure you want to agree to the request?");
            if (cfm) {
                alert("You have agreed to the request.")
                db.collection('chat').doc(this.thisUser).collection(this.otherUser).doc(docid).update({agreed:true}).then(()=> {
                    db.collection('chat').doc(this.thisUser).collection(this.otherUser).doc(docid).get().then(snapshot => {
                        var oldData = snapshot.data();
                        let newData = {
                            type: "review",
                            reviewed: false,
                            item: oldData.item,
                            author: this.otherData.name,
                            createdAt: new Date()
                        };
                        db.collection('chat').doc(this.thisUser).collection(this.otherUser).add(newData).then(() => {
                            db.collection('chat').doc(this.otherUser).collection(this.thisUser).add(newData)
                        });
                    });
                });
            } else {
                alert("You did not agree to the request.");
            }
        },
        submit(event) {
            let docid = event.target.getAttribute("id");
            console.log(docid);
            var cfm = confirm("Are you sure you want to submit this review?");
            if (cfm) {
                db.collection('chat').doc(this.thisUser).collection(this.otherUser).doc(docid).get().then(snapshot1 => {
                    var data1 = snapshot1.data();
                    db.collection('listing').doc(data1.item).get().then(snapshot2 => {
                        var data2 = snapshot2.data();
                        var rating = data2.rating;
                        var reviewsData = data2.reviewsData;
                        if (rating == null) {
                            rating = 0;
                        }
                        if (reviewsData == null) {
                            reviewsData = {};
                        }
                        reviewsData[this.thisUser] = {}
                        reviewsData[this.thisUser].rating = this.rating;
                        reviewsData[this.thisUser].review = this.review;
                        reviewsData[this.thisUser].name = this.thisData.name;
                        var pair = [0,0]
                        Object.keys(reviewsData).forEach(function(key) {
                            pair[0] += 1;
                            pair[1] += Number(reviewsData[key].rating)
                        });
                        rating = pair[1]/pair[0];
                        console.log(rating);
                        db.collection('listing').doc(data1.item).update({rating:rating,reviewsData:reviewsData}).then(()=> {
                            db.collection('chat').doc(this.thisUser).collection(this.otherUser).doc(docid).update({reviewed:true}).then(()=> {
                                alert("Review Submitted!");
                            });
                        });
                    });
                });
            } else {
                alert("Review Submission Cancelled.");
            }
        },
        fetchInfo() {
            console.log(this.thisUser);
            db.collection('users').doc(this.thisUser).get().then(userDoc => {
                    this.thisData = userDoc.data();
                    console.log(this.thisData);
            });
            console.log(this.itemid);
            db.collection('listing').doc(this.itemid).get().then(itemDoc => {
                var itemData = itemDoc.data();
                var uid = itemData.userId;
                this.itemData = itemData;
                this.otherUser = uid;
                console.log(this.itemData);
                console.log(this.otherUser);
                db.collection('users').doc(uid).get().then(userDoc => {
                    this.otherData = userDoc.data();
                    console.log(this.otherData);
                });
                db.collection('chat').doc(this.thisUser).collection(uid).orderBy('createdAt').onSnapshot((querySnapshot) => {
                    let allMessages = [];
                    querySnapshot.forEach(doc => {
                        var message = doc.data();
                        message["id"] = doc.id;
                        allMessages.push(message)
                    });
                    this.messages = allMessages;
                    console.log(this.messages);
                });
            });
        }
    },
    created() {
        this.fetchInfo();
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'FredokaOne';
        src: url('/fonts/fredokaone-regular-webfont.woff2') format('woff2'),
             url('/fonts/fredokaone-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    .background {
        background: #47E4E4;
        font-family: sans-serif;
        height: 79vh;
        min-width: 1000px;
        min-height: 595px;
    }
    .flex-container {
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        height: 100%;
    }
    .flex-child-bio {
        margin: 30px 0px 30px 30px;
        border-radius: 25px 0px 0px 25px;
        background: whitesmoke;
        flex: 2;
        text-align: center;
        height: 90%;
    }
    .bio {
        margin: 20px;
    }
    .bio-header {
        font-family: "FredokaOne";
    }
    .bio-info {
        text-align: left;
    }
    .image-cropper {
        width: 150px;
        height: 150px;
        overflow: hidden;
        border-radius: 50%;
        margin: auto;
    }
    .profile-pic {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }   
    .flex-child-chat {
        margin: 30px 30px 30px 0px;
        background: whitesmoke;
        flex: 3;
        height: 90%;
    }
    .chat-msg {
        background-image: url("../../assets/ChatBG.png");
        background-size: cover;
        height: 85%;
        overflow-y: auto;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }
    .msg {
        margin: 10px 30px;
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
    .msg-bubble {
        background: lightgray;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        border-radius: 5px;
        word-wrap: break-word;
        font-size: 16px;
        max-width: 400px;
        padding: 10px;
    }
    .msg-noti {
        background: #5ABAC0;
        color: whitesmoke;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        border-radius: 5px;
        word-wrap: break-word;
        font-size: 16px;
        padding: 10px;
    }
    .msg-btn {
        border-radius: 8px;
        border: none;
        padding: 5px 20px;
        background-color: whitesmoke;
        color: black;
        cursor: pointer;
        transition-duration: 0.4s;
        font-size: 16px;
        font-weight: bold;
    }
    .msg-btn:hover {
        background-color: black;
        color: whitesmoke;
    }
    .msg-btn:disabled {
        background-color: darkgrey;
        color: whitesmoke;
        cursor:default;
    }
    .review-radio-desc {
        display: inline-block;
        vertical-align: middle;
        height:18px;
        width:18px;
    }
    .review-text {
        white-space: pre-line;
        width: 80%;
        height: 100px;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px 20px;
        box-sizing: border-box;
        font-family: sans-serif;
        background: whitesmoke;
    }
    .chat-input {
        background: #5ABAC0;
        height:15%;
        display: flex;
    }
    .input-left {
        margin: 15px;
        flex: 1;
    }
    .input-left-btn {
        height:100%;
        width:100%;
        cursor: pointer;
        background: none;
        border: none;
        color: white;
    }
    .input-left-btn:hover {
        color: black;
    }
    .input-left-btn:disabled {
        color: grey;
    }
    .input-middle {
        margin: 15px 0px 15px 0px;
        flex: 18;
    }
    .input-text-field {
        white-space: pre-line;
        height:100%;
        width:100%;
        font-size: 15px;
        border-radius: 20px;
        border: none;
        padding: 10px 20px;
        box-sizing: border-box;
        font-family: sans-serif;
        background: whitesmoke;
    }
    .input-right {
        margin: 15px;
        flex: 1;
    }
    .input-msg-btn {
        height:100%;
        width:100%;
        cursor: pointer;
        background: none;
        border: none;
        font-size: 25px;
        text-align: left;
        color: white;
    }
    .input-msg-btn:hover {
        color: black;
    }
    .input-req-btn {
        height:100%;
        width:100%;
        cursor: pointer;
        background: none;
        border: none;
        font-size: 25px;
        text-align: left;
        color: white;
    }
    .input-req-btn:hover {
        color: black;
    }
    .input-req-btn:disabled {
        color: grey;
    }
</style>