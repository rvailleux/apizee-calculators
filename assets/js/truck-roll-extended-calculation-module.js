class TruckRollExtendedCalculation {

    constructor(searchParams) {

        this.expectedParams = [
            {name:'num-truck-rolls', defaultValue:80, currentValue: this.hypothesis_truckroll_per_month},
            {name:'cost-per-distance', defaultValue: 20, currentValue: this.hypothesis_cost_km_truckroll},
            {name:'avg-truck-roll-distance', defaultValue:30, currentValue:this.hypothesis_avg_truckroll_distance},
            {name:'avg-truck-roll-duration', defaultValue:2, currentValue:this.hypothesis_avg_truckroll_duration},
            {name:'num-technicians', defaultValue:5, currentValue:this.hypothesis_num_technicians},
            {name:'no-fault-found-rate',  defaultValue:15, currentValue: this.hypothesis_NFF}]

        this.expectedParams.forEach(param => {
             if(!searchParams.has(param.name)) {
                searchParams.set(param.name, param.defaultValue)
             }
        })

        this.numTruckRolls = parseInt(searchParams.get('num-truck-rolls'))
        this.costPerDistance = parseFloat(searchParams.get('cost-per-distance'))
        this.avgTruckRollDistance = parseFloat(searchParams.get('avg-truck-roll-distance'))
        this.avgTruckRollDuration = parseFloat(searchParams.get('avg-truck-roll-duration'))
        this.numTechnicians = parseFloat(searchParams.get('num-technicians'))
        this.noFaultFoundRate = parseFloat(searchParams.get('no-fault-found-rate')) / 100
    }

    get hypothesis_truckroll_per_month(){
        return this.numTruckRolls
    }

    get hypothesis_avg_truckroll_distance(){
        return this.avgTruckRollDistance
    }

    get hypothesis_avg_truckroll_duration(){
        return this.avgTruckRollDuration
    }

    get hypothesis_cost_km_truckroll(){
        return this.costPerDistance
    }
    
    get hypothesis_num_technicians(){
        return this.numTechnicians
    }

    get hypothesis_NFF(){
        return this.noFaultFoundRate*100
    }

    get total_cost(){
        return this.numTruckRolls * this.avgTruckRollDistance * this.costPerDistance * 12
    }

    /**
     * Return total cost in k format
     */
    get result_total_cost(){
        return ( this.total_cost/ 1000).toFixed(0)+" k"
    } 
    get result_cost_per_truckroll(){
        return this.avgTruckRollDistance*this.costPerDistance
    } 

    get result_cost_nff(){
        return this.noFaultFoundRate * this.total_cost
    } 
    get result_total_distance_per_year(){
        return this.numTruckRolls * this.avgTruckRollDistance * 12
    } 

    /**
     * Return co2 emissions in tons C02 eq.
     */
    get total_co2_emissions(){
        return this.result_total_distance_per_year * TruckRollExtendedCalculation.CO2_EMISSION_FACTOR / 1000 / 1000
    } 

    /**
     * Return CO2 emission in Tons
     * output: string
     */
    get result_co2_emissions() {
        return this.total_co2_emissions.toFixed(1)
    }

    get savings(){
        return this.total_cost * TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR
    }

    /**
     * Returns savings in k format
     * output: String
     */
    get result_savings(){
        return (this.savings / 1000).toFixed(0)+" k"
    } 

    get savings_truck_rolls(){
        return this.numTruckRolls * TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR * 12
    }
    
    /**
     * Returns number of spared truck rolls
     * output: string
     */
    get result_savings_truck_rolls(){
        return (this.savings_truck_rolls).toFixed(0)
    } 

    /**
     * Return amount of CO2 avoided
     */
    get result_co2_avoided(){
        return (this.savings_truck_rolls * this.avgTruckRollDistance * TruckRollExtendedCalculation.CO2_EMISSION_FACTOR/1000/1000).toFixed(1)
    } 
    get breakeven(){
        //TOTAL PRICE PER YEAR 
        let totalPricePerYear = TruckRollExtendedCalculation.APIZEE_LICENCE_PRICE * this.numTechnicians * 12
        let savingsPerWeek =  (this.savings / 52)
        
        return totalPricePerYear / savingsPerWeek
    }

    get result_breakeven(){
        return this.breakeven.toFixed(0)
    }
}

TruckRollExtendedCalculation.CO2_EMISSION_FACTOR = 185.3 //source: European Environment Agency
TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR = 0.4
TruckRollExtendedCalculation.APIZEE_LICENCE_PRICE = 140


export default TruckRollExtendedCalculation