import {baseUrl} from './config.js'


export function topList(){
	
	// let ListIds = ['3','0','2','1'];
	
	// return new Promise(function(reslove,reject){
		
	// 	uni.request({
	// 		url:`${baseUrl}/toplist/detail`,
	// 		method:'GET',
	// 		data:{},
	// 		success:res =>{
	// 			let result = res.data.list;
	// 			//console.log(res);
	// 			//result.length = 4;
	// 			//result = result.splice(0,3)
	// 			for(var i=0;i<=ListIds.length;i++){
	// 				result[i].ListId = ListIds[i];
	// 			}
	// 			//在获取的data中取前四个中，遇到一个坑，用result.length = 4会报错，
	// 			//解决方式：用数组的截取
	// 			reslove(result.splice(0,4));
	// 		},
	// 		fail: () => {
				
	// 		},
	// 		complete: () => {
				
	// 		}
	// 	})
	// })
	
	
	let ListIds = ['3','0','2','1'];
	//let ListIds = [{first:3,second:19723756},{first:0,second:3779629},{first:2,second:2884035},{first:1,second:3778678}];
	let ids = ['19723756','3779629','2884035','3778678'];
	
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
					result[i].listId = ListIds[i];
				}
				// for(var j=0;j<=ids.length;j++){
				// 	result[j].ID = ids[j];
				// }
				
				//在获取的data中取前四个中，遇到一个坑，用result.length = 4会报错，
				//解决方式：用数组的截取
				//console.log(result)
				reslove(result.splice(0,4));
			}
			
		})
	})
	
}

// http://localhost:3000/playlist/detail?id=19723756 飙升榜
// https://music.163.com/api/playlist/detail?id=19723756 飙升榜
export function list(ID){
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${ID}`,
		method: 'GET',
	});
}



// export function list(){
// 	let list = ['19723756','3779629','2884035','3778678'];
	
// 	return uni.request({
// 		url: `${baseUrl}/playlist/detail?id=${listId}`,
// 		method: 'GET',
// 		success:res =>{
// 			let result = res.data.list;
// 			for(var i=0;i<=list.length;i++){
// 				result[i].list = list[i];
// 			}
// 			reslove(result.splice(0,4));
// 		},
// 	});
// }
