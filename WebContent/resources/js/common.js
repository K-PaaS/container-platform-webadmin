
const func = {

	url : 'http://15.164.214.190:30333/',
	nameLoad : new function(){},

	init(depth1, depth2){
		// Namespaces 목록조회
		func.loadData('GET', `${func.url}clusters/${sessionStorage.getItem('cluster')}/namespaces/selectbox`, func.namespaces);

		// navigation 초기 선택 설정
		if(depth1 >= 0){
			var nav1d = document.querySelector('nav').querySelectorAll('.dep01');
			var nav2b = document.querySelectorAll('.sub');
			var nav2d = nav2b[depth1].querySelectorAll('a');

			nav1d[depth1].parentNode.classList.toggle('on', true);
			
			if(depth2 >= 0){
				nav2d[depth2].classList.toggle('on', true);
			} else {
				nav1d[depth1].classList.toggle('on', true);
			}
		}

		// navigation height 설정
		var navSub = document.querySelector('nav').querySelectorAll('.sub');

		for(var i=0; i<=navSub.length-1; i++){
			var childSum = navSub[i].childElementCount;

			navSub[i].style.height = (childSum*35+30)+((childSum-1)*10)+'px';
		};
		
		func.evnt();
	},

	evnt(){
		// navigation event
		var nav = document.querySelector('nav').querySelectorAll('.dep01');
		
		for(var i=0; i<=nav.length-1; i++){
			nav[i].addEventListener('click', (e) => {
				e.stopPropagation();
				console.log(e.target);
				
				for(var j=0; j<=nav.length-1; j++){
					nav[j].parentNode.classList.toggle('on', false);
				};

				e.target.parentNode.classList.toggle('on', true);
			}, false);
		};

		// logout event
		document.getElementById('logout').addEventListener('click', (e) => {
			sessionStorage.clear();

			document.location.href = 'member/login.html';
		}, false);
	},

	namespaces(data){
		/*
			detailMessage: "정상적으로 처리 되었습니다."
			httpStatusCode: 200
			items: Array(34)
				0: "1020-namespace"
				1: "1029-2-namespace"
				2: "1029-3-namespace"
				3: "1029-namespace"
			length: 34
			__proto__: Array(0)
			resultCode: "SUCCESS"
			resultMessage: "정상적으로 처리 되었습니다."
		*/
		for(var i=0; i<=data.items.length-1; i++){
			var html = `<li><a href="javascript:;">${data.items[i]}</a></li>`
			
			func.appendHtml(document.querySelector('.nameSpace'), html, 'li');
		};

		var name = document.querySelector('.nameSpace').querySelectorAll('a');

		for(var i=0 ; i<name.length; i++){
			name[i].addEventListener('click', (e) => {
				sessionStorage.setItem('nameSpace' , e.target.innerText);
				document.querySelector('.nameTop').innerHTML = sessionStorage.getItem('namespaces');

				func.loadData('GET', `${func.url}clusters/${sessionStorage.getItem('cluster')}/namespaces/${sessionStorage.getItem('namespaces')}/overview`, func.nameLoad);
			}, false);
		};
	},
	
	// 로그인 체크 ////////////////////////////////////////////////////////////////
	loginCheck(user, pw){
		var request = new XMLHttpRequest();

		request.open('POST', `${func.url}login?isAdmin=true`, false);
		request.setRequestHeader('Content-type', 'application/json');

		request.onreadystatechange = () => {
			if (request.readyState === XMLHttpRequest.DONE){
				if(request.status === 200){
					sessionStorage.setItem('cluster' , JSON.parse(request.responseText).clusterName);
					sessionStorage.setItem('token' , 'Bearer ' + JSON.parse(request.responseText).token);

					document.location.href = '../index.html';
				} else {
					func.alertPopup('ERROR', JSON.parse(request.responseText).detailMessage, true, '닫기');
				};
			};
		};
		
		request.send(`{"userId":"${user}","password":"${pw}"}`);
		// 'testuser', 'PaaS-TA@2020'
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// 데이터 로드 - loadData(method, url, callbackFunction)
	// (전송타입, url, 콜백함수)
	/////////////////////////////////////////////////////////////////////////////////////
	loadData(method, url, callbackFunction, list){
		if(sessionStorage.getItem('token') == null){
			document.location.href = '/member/login.html';
		}

		var request = new XMLHttpRequest();
		request.open(method, url);
		request.setRequestHeader('Content-type', 'application/json');
		request.setRequestHeader('Authorization', sessionStorage.getItem('token'));

		request.onreadystatechange = () => {
			if (request.readyState === XMLHttpRequest.DONE){
				if(request.status === 200 && request.responseText != ''){
					callbackFunction(JSON.parse(request.responseText), list);
				} else if(request.status === 401){
					//sessionStorage.clear();
					//document.location.href = '../login.html';
				};
			};
		};

		request.send();
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// 데이터 저장 - saveData(method, url, data, bull, callFunc)
	// (전송타입, url, 데이터, 분기, 콜백함수)
	/////////////////////////////////////////////////////////////////////////////////////
	saveData(method, url, data, bull, callFunc){
		var request = new XMLHttpRequest();
		request.open(method, url);
		request.setRequestHeader('Content-type', 'application/json');
		request.setRequestHeader('Authorization', sessionStorage.getItem('token'));

		request.onreadystatechange = () => {
			if (request.readyState === XMLHttpRequest.DONE){
				if(request.status === 200 && request.responseText != ''){
					if(method == 'POST'){
						func.alertPopup('SUCCESS', JSON.parse(request.responseText).detailMessage, true, '확인', callFunc);
					} else if(method == 'PATCH'){
						//func.alertPopup('PATCH', 'COMPLETE', func.winReload);
					} else if(method == 'PUT'){
						if(bull != 'false'){
							//func.alertPopup('PUT', 'COMPLETE', func.winReload);
						};
					} else if(method == 'DELETE'){
						func.alertPopup('SUCCESS', JSON.parse(request.responseText).detailMessage, true, '확인', callFunc);
					};
				} else {
					/*
					if(method == 'DELETE'){
						/func.alertPopup('DELETE', 'DELETE FAILED', func.winReload);
					} else {
						/func.alertPopup('SAVE', 'SAVE FAILED', func.winReload);
					};
					*/
				};
			};
		};

		request.send(data);
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// 공통 경고 팝업 - alertPopup(title, text, bull, name, fn)
	// (제목, 문구, 버튼유무, 버튼이름, 콜백함수)
	/////////////////////////////////////////////////////////////////////////////////////
	alertPopup(title, text, bull, name, callback){
		var html = `<div class='modal-wrap' id='modal'><div class='modal'><h5>${title}</h5><p>${text}</p>`;
		if(bull){
			html += `<a class='confirm' href='javascript:;'>${name}</a>`;
		};
		html += `<a class='close' href='javascript:;'>닫기</a></div></div>`;

		func.appendHtml(document.getElementById('wrap'), html, 'div');

		document.getElementById('modal').querySelector('.close').addEventListener('click', (e) => {			
			document.getElementById('wrap').removeChild(document.getElementById('modal'));
		}, false);

		if(callback){
			document.getElementById('modal').querySelector('.confirm').addEventListener('click', (e) => {
				callback();
				document.getElementById('wrap').removeChild(document.getElementById('modal'));
			}, false);
		};
	},

	historyBack(){
		window.history.back();
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// html 생성 - appendHtml(target, html, type)
	// (삽입 타겟, html 내용, 타입)
	/////////////////////////////////////////////////////////////////////////////////////
	appendHtml(target, html, type){
		var div = document.createElement(type);
		div.innerHTML = html;
		while (div.children.length > 0){
			target.appendChild(div.children[0]);
		};
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// html 삭제 - removeHtml(target)
	// (타겟 : 타겟의 자식요소 전부 삭제)
	/////////////////////////////////////////////////////////////////////////////////////
	removeHtml(target){
		while(target.hasChildNodes()){
			target.removeChild(target.firstChild);
		};
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// Count UP - 숫카 카운트업
	// (적용 타겟, 적용 숫자)
	/////////////////////////////////////////////////////////////////////////////////////
	countUp(target, num) {
		var cnt = -1;
		var dif = 0;
		
		var thisID = setInterval(function(){
			if(cnt < num){
				dif = num - cnt;

				if(dif > 0) {
					cnt += Math.ceil(dif / 5);
				};

				target.innerHTML = cnt;
			} else {
				clearInterval(thisID);
			};
		}, 20);
	},

	/////////////////////////////////////////////////////////////////////////////////////
	// 도넛 차트
	// (적용 타겟, 적용 데이터)
	/////////////////////////////////////////////////////////////////////////////////////
	donutChart(target, data){
		var chart = c3.generate({
			bindto: target,
			data: {
				columns: data,
				type : 'donut'
			},
			donut: {
				width: 47
			},
			legend: {
				show: false
			},
			color: {
				pattern: ['#0ca583', '#ffc53e', '#f34111', '#844adb', '#d9d9d9']
			},
		});
	},
}



