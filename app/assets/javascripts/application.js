//= require jquery
//= require budget

"use strict";

var $ = window.jQuery;

$(function(){
    var app = {};
    app.budget = new window.Budget({
        fields: $("input"),
        change_callback: function(value){
            $(".results .content").html(value);
        }
    });

    window.app = app;
});
