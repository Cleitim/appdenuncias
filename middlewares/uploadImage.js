const multer = require('multer');

module.exports = (multer({
    storage : multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,'../uploads/');
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname+"_"+Date.now()+file.originalname);
        },
    }),
    fileFilter: (req, file, cb) =>{
        const extensaImg = ['image/png','image/jpg','image/jpeg'].find(formatoAceito => formatoAceito== file.mimetype);

        if(extensaImg){
            return cb(null, true);
        }

        return cb(null,false);
    }
}))


