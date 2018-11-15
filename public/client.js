{
	const vm = new Vue({
        el: '#app',
        created:function(){

        setInterval(()=>{
        	//fetch time
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
                if(this.timeServ.length === 10){
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

            // fetch secret
            fetch('http://localhost:4001/secret', {
            	headers: {
            		'Accept': 'application/json'
            	},
            })
			.then((res) => {
				return res.json()
			})
			.then((myJson) => {
				// let data = JSON.stringify(myJson)
				// data.forEach(el => {
				// 	console.log(el.text)
					
				// })
				var test = JSON.stringify(myJson[0].text)
				console.log(test)
				this.secretServ.push({'text': test})
			})
			.catch((err) => {
				console.log(err)
				this.secretServ.push({'text': 'ERROR : missed thisone', "time": Date.now()})
			})

        	}, 1000)      
    	},
		data:{
			title: 'Validation Node2',
			secretvalue: '',
			selectedServer: 'all',
			title: 'Validation Node2',
            timeServ:[],
            secretServ: [],
		},
		methods: {
			editSecret: function() {
				data = {"text": document.getElementById('editSecret').value}
				this.secretvalue = data.text
				fetch('http://localhost:4001/secret', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify(data)
				})
					.then((res) => {
						return res.json()
					})
					.catch((err) => {
						console.log(err)
					})
			},
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