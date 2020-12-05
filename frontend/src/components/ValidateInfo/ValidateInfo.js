const ValidateInfo = (values, account) => {
    
let errors = {}
    /* UserName */
    if(!values.name.trim()){
        errors.name = "Prasome ivesti naudotojo varda"
    }
    /* Email */
    if(!values.email && !account){
        errors.email = "Prašome ivesti elektroninį paštą"
    }
    /* Password */
    if(!values.password){
        errors.password = "Prašome ivesti slaptažodį"
    }else if (values.password.length < 6 ){
    errors.password = "Slaptažodis turi būti, bent iš 6 raidžių ar daugiau"
    }
    /* Password2 */
    if(!values.password2 && !account){
        errors.password2 = " Prašome ivesti slaptažodį" 
    }else if(values.password !== values.password2 && !account){
        errors.password2 = "Pakartotinis slaptažodis nesutampa"
    }
    return errors
}
export default ValidateInfo