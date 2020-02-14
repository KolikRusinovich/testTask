var msgs = {
"m001":{"ru":"Ошибка подключения к базе данных","en":"Error connecting to database"},
"m003":{"ru":"Ошибка ввода значения","en":"Error input value"},
"m010":{"ru":"Неверное имя или пароль","en":"Invalid username or password"},
"m011":{"ru":"Адрес электронной почты недействителен","en":"Email address is invalid"},
"m012":{"ru":"Электронная почта и повтор электронной почты не совпадают","en":"Email and Email repeat are not the same"},
"m013":{"ru":"Ошибка sha1(пароль)","en":"Error sha1(password)"},
"m014":{"ru":"Пароль и повтор пароля не совпадают","en":"Password and password repeat are not the same"},
"m015":{"ru":"Войдите в свою учетную запись электронной почты, чтобы подтвердить свой адрес электронной почты.","en":"Sign in to your email account to confirm your email address"},
"m016":{"ru":"Недостаточно прав доступа","en":"Not enough access rights"},
"m017":{"ru":"Аккаунт заблокирован","en":"Account blocked"},
"m018":{"ru":"Пользователь c таким именем уже зарегистрирован","en":"User with this name is already registered"},
"m019":{"ru":"Пользователя с таким e-mail адресом не существует","en":"There is no user with such e-mail address"},
"m020":{"ru":"Истек срок доступа","en":"Expired access"},
"m021":{"ru":"Войти","en":"Login"},
"m022":{"ru":"Почта","en":"Email"},
"m023":{"ru":"Пароль","en":"Password"},
"m024":{"ru":"Введите пароль","en":"Enter Password"},
"m025":{"ru":"Регистрация","en":"Registration"},
"m026":{"ru":"Забыли пароль?","en":"Forgot password?"},
"m027":{"ru":"Повторите почту","en":"Repeat Email"},
"m028":{"ru":"Повторите пароль","en":"Repeat Password"},
"m029":{"ru":"Продолжить","en":"Continue"}
};

$(".loginname").text(msgs.m021.en);
$(".mailname").text(msgs.m022.en);
$(".entermailname").attr('placeholder', msgs.m022.en);
$(".passwordname").text(msgs.m023.en);
$(".enterpassname").attr('placeholder', msgs.m024.en);
$(".signupname").text(msgs.m025.en);
$(".forgotname").text(msgs.m026.en);
$(".mailrepeatename").text(msgs.m027.en);
$(".passwordrepeatename").text(msgs.m028.en);
$(".сontinuename").text(msgs.m029.en);

function login(data) {
	$.ajax({
    type: 'POST',
    url: '/login/',
    data: {"login": data.elements.username.value, "password" : sha1(data.elements.password.value)},
    success: function(data) { var resp = JSON.parse(data);
	$("[name=loginError]").attr('type', 'text');
	$("[name=loginError]").text(msgs[resp.message].en)},
    contentType: "application/json",
    dataType: 'json'
});
};

function checkPw(data) {
	pw1 = data.elements.password.value;
	pw2 = data.elements.confirmpassword.value;
	if (pw1 != pw2 || pw1=="" ||pw2=="") {
		return false;
	}
	else {
		pw1 = sha1(pw1);
		pw2 = sha1(pw2);
		return true;
	}
}

function checkMail(data) {
	mail1 = data.elements.username.value;
	mail2 = data.elements.confirmusername.value;
	if (mail1 != mail2 || mail1=="" || mail2=="") {
		return false;
	}
	else return true;
}


function checkLengthPassword(data) {
	var passw = data.elements.password.value;
	
	if(passw.length<6) {
		$("[name=regError]").text('Password must be at least 6 characters');
		return false; 
	}
	else return true;
}

function register(data) {
	if(checkPw(data) && checkLengthPassword(data) && checkMail(data) && validate(data)){
		$.ajax({
		type: 'POST',
		url: '/register/',
		data: {"mail": data.elements.username.value, "confirmmail": data.elements.confirmusername.value, "password" : sha1(data.elements.password.value), "confirmpassword" : sha1(data.elements.confirmpassword.value)},
		success: function(data) { var resp = JSON.parse(data);
			$("[name=regError]").attr('type', 'text');
			$("[name=regError]").text(msgs[resp.message].en);
			/*if(resp.success) {
				$('.modal').modal('hide');
			//	$("[name=regError]").text(msgs.m001.en);
			}*/
		},
		
		contentType: "application/json",
		dataType: 'json'
	});	
	$('.modal').modal('hide');
	alert(msgs.m015.en);
	}
	else {
		if(!checkPw(data))
		{
		$("[name=regError]").text(msgs.m014.en);
		}
		
		else if(!checkMail(data))
			{
		$("[name=regError]").text(msgs.m012.en);
		}
		return false;
	}
};

function forgot(data) {
	$.ajax({
    type: 'POST',
    url: '/login/',
    data: {"login": data.elements.username.value},
    success: function(data) { var resp = JSON.parse(data);
	$("[name=forgotError]").attr('type', 'text');
	$("[name=forgotError]").text(msgs[resp.message].en)},
    contentType: "application/json",
    dataType: 'json'
});
};

function asd(data) { var resp = JSON.parse(data);
	$("[name=loginError]").attr('type', 'text');
	$("[name=loginError]").text(msgs[resp.message].ru)};
	
function validate(data) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   var address = data.elements.username.value;
   if(reg.test(address) == false) {
      $("[name=regError]").text('Enter correct mail');
      return false;
   }
   else return true;
}