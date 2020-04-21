const app = new Vue({
    el: '#app',
    data:{
        requests:[]
    },
    methods:{
        upvoteRequest(id){
            const upvote = firebase.functions().httpsCallable('upvote');
            upvote({id})
                .catch(err=>{
                    console.log(err.message);
                })
        }
    },
    mounted(){
        const ref = firebase.firestore().collection('requests').orderBy('upvotes', 'desc');
        ref.onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.requests.push({...doc.data(), id: doc.id});
            });
            console.log(this.requests)
        });
    }
})
