"use strict";

var Budget = function(opt){
    var o; for(o in opt) this[o]=opt[o];
    this.bind_events();
};

Budget.prototype = {
    bind_events: function(){
        var _this = this;
        this.fields.on("keyup", function(){
            _this.change_callback.call(this, _this.calculate());
        });
    },

    calculate: function(){
        var hour_income = this.get_value("monthly-income")/22/8;
        var risk = this.get_value("risk");
        var hours = this.get_value("hours")/(1-(risk/100));
        var profit = this.get_value("profit");
        var tax = this.get_value("tax");
        var urgency = this.get_value("urgency");
        var trading = this.get_value("trading");

        var taxes = (profit+tax+urgency+trading)/100;
        var final_value = (hour_income * hours) / (1-taxes);

        if(final_value > 0) { 
            return this.format_money(final_value)
        } else {
            return "Os campos foram preenchidos corretamente?"
        }
    },

    format_money: function(value){
        return "R$ "+String(value).replace(/([^.]*)\.([^.]{2}).*/, "$1,$2");
    },

    get_value: function(name){
        var value = parseInt(this.fields.filter("[name='"+name+"']").val());
        if(isNaN(value)) return 0; else return value;
    }
};