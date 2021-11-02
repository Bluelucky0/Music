import {baseUrl} from './config.js'


export function topList(){
	
	let ListIds = ['3','0','2','1'];
	
	return new Promise(function(reslove,reject){
		
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			data:{},
			success:res =>{
				let result = res.data.list;
				//console.log(res);
				//result.length = 4;
				//result = result.splice(0,3)
				for(var i=0;i<=ListIds.length;i++){
					result[i].ListId = ListIds[i];
				}
				//在获取的data中取前四个中，遇到一个坑，用result.length = 4会报错，
				//解决方式：用数组的截取
				reslove(result.splice(0,4));
			},
			fail: () => {
				
			},
			complete: () => {
				
			}
		})
	})
}

