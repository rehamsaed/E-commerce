const joi =require('joi')
const schema=joi.object({

    ProductName:joi.string().required(),
    Price:joi.number().required(),
    Description:joi.string().required()

    
})
module.exports=schema