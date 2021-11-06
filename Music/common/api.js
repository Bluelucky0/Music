import {baseUrl} from './config.js'

//在主页中。跳转到哪一个歌单
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

//每一个歌单的详情页
export function list(listId){
	return uni.request({
		url: `${baseUrl}/playlist/detail?id=${listId}`,
		//url: `${baseUrl}/top/list?id=${listId}`,
		//url: `https://music.163.com/api/playlist/detail?id=${listId}`,
		method: 'GET'
	});
}

//每一首歌的歌曲信息
export function songDetail(songId){
	return uni.request({
		url: `${baseUrl}/song/detail?ids=${songId}`,
		method: 'GET'
	});
}
//每一首歌的相似歌曲信息
export function songSimi(songId){
	return uni.request({
		url: `${baseUrl}/simi/song?id=${songId}`,
		method: 'GET'
	});
}
//歌的热评
export function songComment(songId){
	return uni.request({
		url: `${baseUrl}/comment/music?id=${songId}`,
		method: 'GET'
	});
}
//歌词
export function songLyric(songId){
	return uni.request({
		url: `${baseUrl}/lyric?id=${songId}`,
		method: 'GET'
	});
}
//歌的音频地址
export function songUrl(songId){
	return uni.request({
		url: `${baseUrl}/song/url?id=${songId}`,
		method: 'GET'
	});
}

//热搜
//热搜榜
export function searchHot(){
	return uni.request({
		url: `${baseUrl}/search/hot/detail`,
		method: 'GET'
	});
}
//搜索关键词
export function searchWord(word){
	return uni.request({
		url: `${baseUrl}/search?keywords=${word}`,
		method: 'GET'
	});
}

export function searchSuggest(word){
	return uni.request({
		url: `${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
		method: 'GET'
	});
}
		
		