import {baseUrl} from './config.js'


export function topList(){
	
	//let ListIds = ['3','0','2','1'];
	
	let ListIds = ['19723756','3779629','2884035','3778678'];
	
	return new Promise(function(reslove,reject){
		
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			data:{},
			success:res =>{
				let result = res.data.list;
				//console.log(result);
				for(let i=0;i<=ListIds.length;i++){
					result[i].listId = ListIds[i]
				}
				result.length = 4;
				//在获取的data中取前四个中，遇到一个问题，用result.length = 4会报错，
				//然后我用数组的截取splice
				//reslove(result.splice(0,4));
				reslove(result);
			}
			
		});
	})
	
}

export function list(listId){
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${listId}`,
		//url: `${baseUrl}/top/list?id=${listId}`,
		//url: `https://music.163.com/api/playlist/detail?id=${listId}`,
		method: 'GET'
	});
}


		
		