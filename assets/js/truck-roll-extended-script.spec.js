import { expect, test } from "bun:test";

import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module"

let params = {
    numTruckRolls : 14,
    costPerDistance : 90,
    avgTruckRollDistance : 120, 
    avgTruckRollDuration : 2, 
    numTechnicians : 5, 
    noFaultFoundRate : 15
}
 
function forgeUrlParams(params) {
    const queryString = 'num-truck-rolls='+params.numTruckRolls+'&cost-per-distance='+params.costPerDistance+'&avg-truck-roll-distance='+params.avgTruckRollDistance+'&avg-truck-roll-duration='+params.avgTruckRollDuration+'&num-technicians='+params.numTechnicians+'&no-fault-found-rate='+params.noFaultFoundRate
    const validSearchParams = new URLSearchParams(queryString)

    return validSearchParams
}

const validSearchParams = forgeUrlParams(params)

test("Valid Constructor", () => {

    let extension = new TruckRollExtendedCalculation(validSearchParams)

    expect(extension.numTruckRolls).toBe(parseInt(params.numTruckRolls))
    expect(extension.costPerDistance).toBe(parseFloat(params.costPerDistance))
    expect(extension.avgTruckRollDistance).toBe(parseFloat(params.avgTruckRollDistance))
    expect(extension.avgTruckRollDuration).toBe(parseFloat(params.avgTruckRollDuration))
    expect(extension.numTechnicians).toBe(parseFloat(params.numTechnicians))
    expect(extension.noFaultFoundRate).toBe(parseFloat(params.noFaultFoundRate)/100)
});

test("Missing value in searchParams", () => {

        
        let invalidQueryString = "http://127.0.0.1:4000/truck-roll-calculator-extended/en?cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
        const searchParams = new URLSearchParams(invalidQueryString)


        let extension2 = new TruckRollExtendedCalculation(searchParams)
        expect(extension2.numTruckRolls).toBe(80)
});

test("Correct number of truck roll", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.hypothesis_truckroll_per_month).toBe(16)
})

test("Correct avg distance", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.hypothesis_avg_truckroll_distance).toBe(120)
})


test("Correct cost per truck roll", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.hypothesis_cost_km_truckroll).toBe(90)
})

test("Correct number of technicians", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.hypothesis_num_technicians).toBe(5)
})

test("Correct rate of NFF", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.hypothesis_NFF).toBe(15)
})


test("Correct result total cost", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_total_cost).toBe('2074 k')
})


test("Correct result cost per truck roll", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_cost_per_truckroll).toBe(10800)
})


test("Correct result nff cost", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_cost_nff).toBe(311040)
})


test("Correct result total distance per year", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_total_distance_per_year).toBe(23040)
})


test("Correct result CO2 emissions", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_co2_emissions).toBe("4.3")
})

test("Correct result savings", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_savings).toBe("829 k")
})


test("Correct result fexer truck rolls", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_savings_truck_rolls).toBe("77")
})


test("Correct result avoided CO2 emissions", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_co2_avoided).toBe("1.7")
})


test("Correct result time to breakeven", () =>{
    let queryString = "num-truck-rolls=16&cost-per-distance=90&avg-truck-roll-distance=120&avg-truck-roll-duration=2&num-technicians=5&no-fault-found-rate=15"
    const searchParams = new URLSearchParams(queryString)
    let extension = new TruckRollExtendedCalculation(searchParams)
    expect(extension.result_breakeven).toBe("1")
})

