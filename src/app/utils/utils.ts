
export default class Utils {

    static formatPrice (price : any){
        return isNaN(price) ? price : parseFloat(price).toFixed(2);
    }

}