const app = new Vue({
    el: '#app',
    data:{
        requests:[]
    },
    mounted(){
        const ref = firebase.firestore().collection('requests');
        ref.onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.requests.push({...doc.data(), id: doc.id});
            });
            console.log(this.requests)
        });
    }
})
