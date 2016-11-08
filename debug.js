function postWithAjax(myajax, url) {
  myajax = myajax || {};
  //myajax.type = $("#httpmethod").val();
  myajax.url = url;
	myajax.type = "GET";
  myajax.complete = function(jqXHR) {
		$("#statuspre").text(
				"HTTP " + jqXHR.status + " " + jqXHR.statusText);
		if (jqXHR.status == 0) {
			httpZeroError();
		} else if (jqXHR.status >= 200 && jqXHR.status < 300) {
			$("#statuspre").addClass("alert-success");
			$("#errordiv").html('');
		} else if (jqXHR.status >= 400) {
			$("#statuspre").addClass("alert-error");
		} else {
			$("#statuspre").addClass("alert-warning");
			$("#errordiv").html('');
		}
		$("#outputpre").text(jqXHR.responseText);
		$("#headerpre").text(jqXHR.getAllResponseHeaders());
	}

	if (jQuery.isEmptyObject(myajax.data)) {
		myajax.contentType = 'application/x-www-form-urlencoded';
	}

	$("#outputframe").hide();
	$("#outputpre").empty();
	$("#headerpre").empty();
	$("#outputframe").attr("src", "")
	$("#ajaxoutput").show();
	$("#statuspre").text("0");
	$("#statuspre").removeClass("alert-success");
	$("#statuspre").removeClass("alert-error");
	$("#statuspre").removeClass("alert-warning");

  $('#ajaxspinner').show();
	var req = $.ajax(myajax).always(function(){
    $('#ajaxspinner').hide();
	});
}

$("#submitajax1").click(function(e) {
  e.preventDefault();
	let url = $("#urlvalue1").val();
  postWithAjax({}, url);
});
$("#submitajax2").click(function(e) {
  e.preventDefault();
	let url = $("#urlvalue2").val();
  postWithAjax({}, url);
});
$("#submitajax3").click(function(e) {
  e.preventDefault();
	let url = $("#urlvalue3").val();
  postWithAjax({}, url);
});

function createHeaderData(){
  var mydata = {};
	var parameters = $("#allheaders").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(parameters).eq(i).attr("name");
		if (name == undefined || name == "undefined") {
			continue;
		}
		value = $(parameters).eq(i).val();
		mydata[name] = value
	}
  return(mydata);
}

function createUrlData(){
  var mydata = {};
	var parameters = $("#allparameters").find(".realinputvalue");
	for (i = 0; i < parameters.length; i++) {
		name = $(parameters).eq(i).attr("name");
		if (name == undefined || name == "undefined") {
			continue;
		}
		value = $(parameters).eq(i).val();
		mydata[name] = value
	}
  return(mydata);
}

function httpZeroError() {
	$("#errordiv").html('<div class="alert alert-error"> <a class="close" data-dismiss="alert">&times;</a> <strong>Oh no!</strong> Javascript returned an HTTP 0 error. One common reason this might happen is that you requested a cross-domain resource from a server that did not include the appropriate CORS headers in the response. Better open up your Firebug...</div>');
}
