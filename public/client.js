{
	const vm = new Vue({
        el: '#app',
        created:function(){

        setInterval(()=>{
            fetch('http://localhost:4000/',
            {  
                headers: {
                'Accept': 'application/json'
                },
            })
            .then((res) =>{
                return res.json()
            })
            .then((myJson) =>{
                let data = JSON.parse(myJson)

                if(this.timeServ.length === 100){
                    this.timeServ.shift()

                    data.forEach(el =>{ 
                        this.timeServ.push({'date': el.date, "time": Date.now()})
                    })

                }else{

                    data.forEach(el =>{ 
                        // this.timeServ.push(el)
                        this.timeServ.push({'date': el.date, "time": Date.now()})

                    })
                }
            })

            .catch(err =>{
                console.log(err)
                this.timeServ.push({'date': 'DOWN'})
            })
        }, 1000)


            
          
          },
		data:{
            title: 'Validation Node2',
            timeServ:[],
            startPag: 0,
            lastPag : 10,
        }, 
        computed:{
          pagination: function (){
            console.log(this.startPag, this.lastPag)
            return this.timeServ.slice(this.startPag, this.lastPag)

          },
  
        },
        methods:{
            
            dateDiff : (arg) => {
                let timeNow = Date.now()
                console.log(timeNow, arg)

                let diff = timeNow - arg
                let result = Math.floor(diff / 1000);
              return result
            }
            
        }
	})
}