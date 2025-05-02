
exports.AuthName=(FullName)=>{
    const ValidFullname= /^[a-zA-Z\s]{2,50}$/
    return ValidFullname.test(FullName)

}

exports.AuthEmail=(Email)=>{
    const ValidEmail=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return ValidEmail.test(Email)

}

exports.AuthPassword=(Passord)=>{
    const ValidPassord=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return ValidPassord.test(Passord)

}