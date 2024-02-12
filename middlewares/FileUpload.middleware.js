import multer from "multer";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images");
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+"_"+file.originalname;
        cb(null,uniqueSuffix);
    }
});

export const upload=multer({storage});