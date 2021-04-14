<template>
    <div class="background">
        <div class="flex-container">
            <div class="flex-child-inbox">
                <div v-for="user in users" v-bind:key="user.id">
                    <button class="inbox" v-bind:id="user[0]" v-on:click="choose($event)">{{user[1]}}</button>
                </div>
            </div>  
            <div class="flex-child-chat">
                <div class="chat-msg">
                    <br>
                    <div v-for="message in messages" v-bind:key="message.id">
                        <div v-if="message.author == thisData.name">
                            <div v-if="message.type == 'text'" class="msg" style="float:right">
                                <span class="msg-user"> You </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">{{message.message}}</div>
                            </div>
                            <div v-if="message.type == 'request'" class="msg" style="float:right">
                                <span class="msg-user"> You </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">--Made a tuition fee offer--</div>
                            </div>
                            <div v-if="message.type == 'review'" class="msg" style="float:right">
                                <span class="msg-user"> You </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">--Tutee has agreed to your request--</div>
                            </div>
                        </div>
                        <div v-if="message.author == otherData.name">
                            <div v-if="message.type == 'text'" class="msg" style="float:left">
                                <span class="msg-user"> {{message.author}} </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">{{message.message}}</div>
                            </div>
                            <div v-if="message.type == 'request'" class="msg" style="float:left">
                                <span class="msg-user"> {{message.author}} </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">
                                    The tutor has made a request of {{message.fee}} per {{message.unit}} for {{message.item}}.
                                    <br><br>
                                    <div v-if="message.agreed == false">
                                        <button v-bind:id="message.id" v-on:click="agree($event)">Agree</button>
                                    </div>
                                    <div v-if="message.agreed == true">
                                        <button disabled>You have agreed to the request</button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="message.type == 'review'" class="msg" style="float:left">
                                <span class="msg-user"> {{message.author}} </span>
                                <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                                <div class="msg-bubble">
                                    Leave a Review!
                                    <br><br>
                                    <div v-if="message.reviewed == false">
                                        <input type="radio" v-model="rating" value=1>
                                        <input type="radio" v-model="rating" value=2>
                                        <input type="radio" v-model="rating" value=3>
                                        <input type="text" v-model="review">
                                        <button v-bind:id="message.id" v-on:click="submit($event)">Submit</button>
                                    </div>
                                    <div v-if="message.reviewed == true">
                                        <input type="radio" value=1 disabled>
                                        <input type="radio" value=2 disabled>
                                        <input type="radio" value=3 disabled>
                                        <input type="text" disabled>
                                        <br><br>
                                        <button disabled>You have made a review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <br>
                </div>
                <div v-if="!showRequestMaker" class="chat-input">
                    <div class="input-left">
                        <button class="input-left-btn" v-on:click="toggleRequestMaker()">MakeOffer</button>
                    </div>
                    <div class="input-middle">
                        <textarea class="input-text-field" @keyup.enter="saveMessage()" v-model="message" type="text" placeholder="Type a message"/>
                    </div>
                    <div class="input-right">
                        <button class="input-msg-btn" v-on:click="saveMessage()"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div v-else class="chat-input">
                    <div class="input-left">
                        <button class="input-left-btn" v-on:click="toggleRequestMaker()">SendText</button>
                    </div>
                    <div class="input-middle">
                        <select v-model="requestItem" required>
                            <option v-for="item in items" v-bind:key="item.id" :value="item.id">{{item.module}}</option>
                        </select>
                        <input id="requestFee" type="number" v-model="requestFee" required>
                        <input id="requestUnit" type="text" v-model="requestUnit" required>
                    </div>
                    <div class="input-right">
                        <button class="input-req-btn" v-on:click="request()">Request</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase";
import { auth } from '../../firebase';

export default {
    data() {
        return {
            message: null,
            messages: [],
            thisUser: auth.currentUser.uid,
            thisData: [],
            users: {},
            otherUser: '',
            otherData: [],
            items: [],
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
        toggleRequestMaker() {
            this.showRequestMaker = !this.showRequestMaker;
        },
        saveMessage() {
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
        },
        request() {
            var cfm = confirm("Do you want to request SGD("+this.requestFee+") per "+this.requestUnit+" for "+this.requestItem+"?");
            if (cfm) {
                alert("You requested "+this.requestFee+" per "+this.requestUnit+" for "+this.requestItem+".");
                let data = {
                    type: "request",
                    agreed: false,
                    item: this.requestItem,
                    fee: this.requestFee,
                    unit: this.requestUnit,
                    author: this.thisData.name,
                    createdAt: new Date()
                }
                console.log(data);
                db.collection('chat').doc(this.thisUser).collection(this.otherUser).add(data).then(() => {
                    db.collection('chat').doc(this.otherUser).collection(this.thisUser).add(data)
                });
            } else {
                alert("You cancelled your request.");
            }
            this.showRequestMaker = false;
        },
        agree(event) {
            let docid = event.target.getAttribute("id");
            console.log(docid);
            var cfm = confirm("Do you agree to the request?");
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
                alert("You did not agree to the request.")
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
                            reviewsData = [0,{}];
                        }
                        reviewsData[1][this.thisUser] = {}
                        reviewsData[1][this.thisUser].rating = this.rating;
                        reviewsData[1][this.thisUser].review = this.review;
                        reviewsData[0] += 1;
                        console.log(rating)
                        rating = Number(rating) + Number(this.rating);
                        console.log(rating)
                        rating = rating/reviewsData[0];
                        console.log(rating)
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
        fetchInformation() {
            db.collection('users').doc(this.thisUser).get().then(snapshot => {
                this.thisData = snapshot.data();
                console.log(this.thisData);
                this.fetchItems();
                this.fetchUsers();
            });
        },
        fetchItems() {
            var items = this.thisData.teaching;
            items.forEach(item => {
                db.collection('listing').doc(item).get().then(itemDoc => {
                    var id = itemDoc.id;
                    var data = itemDoc.data();
                    data["id"] = id;
                    this.items.push(data);
                });
            });
            console.log(this.items);
        },
        fetchUsers() {
            this.users = this.thisData.chatUsers;
        },
        /*
        fetchMessages() {
            var users = this.thisData.chatUsers;
            users.forEach(user => {
                db.collection('chat').doc(this.thisUser).collection(user).orderBy('createdAt').onSnapshot(snapshot => {
                    let messages = [];
                    snapshot.forEach(doc => {
                        var message = doc.data();
                        message["id"] = doc.id;
                        messages.push(message);
                    });
                    this.allMessages[user] = messages;
                });
            });
            console.log(this.allMessages);
        },
        */
        choose(event) {
            let id = event.target.getAttribute("id");
            console.log(id);
            db.collection('users').doc(id).get().then(userDoc => {
                this.otherUser = userDoc.id;
                this.otherData = userDoc.data();
                db.collection('chat').doc(this.thisUser).collection(id).orderBy('createdAt').onSnapshot(snapshot => {
                    let messages = [];
                    snapshot.forEach(doc => {
                        var message = doc.data();
                        message["id"] = doc.id;
                        messages.push(message);
                    });
                    this.messages = messages;
                    console.log(this.messages);
                });
            });
        }
    },
    created() {
        this.fetchInformation();
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
        height: 78vh;
    }
    .flex-container {
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        height: 100%;
    }
    .flex-child-inbox {
        margin: 30px 0px 30px 30px;
        border-radius: 25px 0px 0px 25px;
        background: whitesmoke;
        flex: 2;
        text-align: center;
        height: 90%;
        overflow-y: auto;
    }
    .inbox {
        width:100%;
        height: 100px;
        border: none;
        background: whitesmoke;
        font-family: "FredokaOne";
        cursor: pointer;
    }
    .inbox:hover, .inbox:active {
        color: white;
        background: black;
    }
    .image-cropper {
        width: 200px;
        height: 200px;
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
    .input-middle {
        margin: 15px 0px 15px 0px;
        flex: 18;
    }
    .input-text-field {
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
</style>