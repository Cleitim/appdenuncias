const express = require("express");
const UserController = require("../controllers/UserController");
const DenunciaController = require("../controllers/denunciaController");
const authController = require('../controllers/authController');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-'+ Date.now() +'-'+ file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


router.get("/users", UserController.getalluser);
router.post("/addusers", UserController.addnewuser);

router.get("/", DenunciaController.getalldenuncias);
router.get("/blog", authController.isAuthenticated ,DenunciaController.getalldenuncias);
router.get("/adddenuncia", authController.isAuthenticated ,DenunciaController.getAddDenuncia);
router.post("/adddenuncia", authController.isAuthenticated ,upload.single('image') ,DenunciaController.addnewdenuncia);
router.get("/denuncias", authController.isAuthenticated ,DenunciaController.getmydenuncias);

//Registro usuarios
router.get("/register",(req,res)=>{
  res.render("register");
});

router.get("/login",(req,res)=>{
  res.render("login",{alert:false});
});

//auths Rotas
router.post("/register" ,authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;