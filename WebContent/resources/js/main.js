

// main swiper
$(function() {
	var swiper = new Swiper('.interchange', {
		autoplay: {delay: 3000,
				disableOnInteraction: true,
		},
		loop: true,
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
		
	});

});

// 회원가입 약관 전체체크
$(document).ready(function(){
    $("#ag01").click(function(){
        if($("#ag01").prop("checked")){
            $("input[name=chk]").prop("checked",true);
        }else{
            $("input[name=chk]").prop("checked",false);
        }
    })
})



// 게시판 accordion
$(function(){
	$(".acco-board li > div").hide();

	$(".acco-board li a").click(function(){
		$(this).next().slideToggle();
		$(".acco-board li a").not(this).next().slideUp();
	});

	$(".acco-board li a").eq(0).trigger("click");
	
});


// 파일첨부
var uploadFile = $('.fileBox .uploadBtn');
uploadFile.on('change', function(){
    if(window.FileReader){
        var filename = $(this)[0].files[0].name;
    } else {
        var filename = $(this).val().split('/').pop().split('\\').pop();
    }

    $(this).siblings('.fileName').val(filename);
});

// 전문기업목록 더보기 accordion
$(function(){
	$(".achieve > div").hide();

	$(".achieve > a").click(function(){
		$(this).next().slideToggle();
		$(".achieve > a").not(this).next().slideUp();
	});

});