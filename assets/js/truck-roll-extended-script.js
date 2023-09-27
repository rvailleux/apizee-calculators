import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module.js";

(function () {
    'use strict'

    let searchParams = new URLSearchParams(location.search)
    let calculationModule = new TruckRollExtendedCalculation(searchParams)

    calculationModule.expectedParams.forEach(param => {
        console.log(param.currentValue)
    })
    
    // if (!searchParams.has('num-truck-rolls')) {
        
    //     $("#truck-roll-form input#num-truck-rolls").val()
    // }

    $(".generated").each(function () {
        var id = $(this).attr("id");

        if (calculationModule[id] != undefined) {
            $("#" + id).text(calculationModule[id].toLocaleString('en-US'))
        } else {
            console.log("get " + id + "(){}")
        }

    });
})()