const {response} = require('express');

const logIn=(res=response)=>{
    try {
        res.status(200).json({
            msg: 'Working'
        })
        
    } catch (error) {
        res.status(400).json({
            msg:error
        })
    }
}

module.exports= {
    logIn
}